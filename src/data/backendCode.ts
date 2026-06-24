/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BackendFile } from '../types';

export const backendCodeFiles: BackendFile[] = [
  {
    path: 'pyproject.toml',
    name: 'pyproject.toml',
    language: 'toml',
    description: 'Poetry dependency management definition for the FastAPI application.',
    content: `[tool.poetry]
name = "portfolio-api"
version = "0.1.0"
description = "FastAPI backend showing modern async database integrations"
authors = ["Bipika Amatya <bipika.amatya@gmail.com>"]
readme = "README.md"

[tool.poetry.dependencies]
python = "^3.11"
fastapi = "^0.110.0"
uvicorn = {extras = ["standard"], version = "^0.28.0"}
sqlalchemy = {extras = ["asyncio"], version = "^2.0.28"}
asyncpg = "^0.29.0"
pydantic = {extras = ["email"], version = "^2.6.4"}
pydantic-settings = "^2.2.1"
alembic = "^1.13.1"
python-multipart = "^0.0.9"
psycopg2-binary = "^2.9.9"

[tool.poetry.group.dev.dependencies]
pytest = "^8.1.1"
pytest-asyncio = "^0.23.5"
httpx = "^0.27.0"
black = "^24.2.0"
ruff = "^0.3.2"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
`
  },
  {
    path: 'Dockerfile',
    name: 'Dockerfile',
    language: 'dockerfile',
    description: 'Multi-stage production-ready Dockerfile optimized for Poetry caching and size minimization.',
    content: `# Build stage
FROM python:3.11-slim AS builder

WORKDIR /app

ENV PYTHONUNBUFFERED=1 \\
    PYTHONDONTWRITEBYTECODE=1 \\
    POETRY_NO_INTERACTION=1 \\
    POETRY_VIRTUALENVS_IN_PROJECT=true \\
    POETRY_HOME="/opt/poetry"

ENV PATH="$POETRY_HOME/bin:$PATH"

RUN apt-get update && apt-get install --no-install-recommends -y \\
    build-essential \\
    curl \\
    libpq-dev \\
    && rm -rf /var/lib/apt/lists/*

# Install poetry
RUN curl -sSL https://install.python-poetry.org | python3 -

# Copy dependencies definitions
COPY pyproject.toml poetry.lock* ./

# Install dependencies (runtime only, caching layer)
RUN poetry install --only main --no-root

# Runtime stage
FROM python:3.11-slim AS runtime

WORKDIR /app

# Create a non-privileged user to run the application
RUN groupadd -g 1000 appuser && \\
    useradd -r -u 1000 -g appuser appuser

ENV PATH="/app/.venv/bin:$PATH" \\
    PORT=3000

# Copy venv from builder
COPY --from=builder /app/.venv /app/.venv

# Copy source files
COPY app ./app
COPY alembic.ini ./alembic.ini
COPY migrations ./migrations

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 3000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "3000"]
`
  },
  {
    path: 'docker-compose.yml',
    name: 'docker-compose.yml',
    language: 'yaml',
    description: 'Docker Compose configuration coordinating the FastAPI web container with a stateful PostgreSQL database, complete with network and volume declarations.',
    content: `version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql+asyncpg://postgres:securepassword@db:5432/portfolio_db
      - ENVIRONMENT=production
      - JWT_SECRET=super_secret_jwt_token_key_here
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=securepassword
      - POSTGRES_DB=portfolio_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d portfolio_db"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
`
  },
  {
    path: 'app/database.py',
    name: 'database.py',
    language: 'python',
    description: 'Asynchronous SQLAlchemy database engine, session management, and Base metadata setup.',
    content: `import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base

# Fetch database URL from environment
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql+asyncpg://postgres:securepassword@localhost:5432/portfolio_db"
)

# Create an asynchronous engine for efficient connection pooling
engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    pool_size=10,
    max_overflow=20,
    pool_recycle=3600,
)

# Session factory for creating async sessions
async_session_local = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

# Declarative base class for models
Base = declarative_base()

# Dependency injector for database sessions inside FastAPI route handlers
async def get_db():
    async with async_session_local() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
`
  },
  {
    path: 'app/models.py',
    name: 'models.py',
    language: 'python',
    description: 'Database schema declaration using SQLAlchemy ORM (including PortfolioItem, Project, and ContactMessage).',
    content: `import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from app.database import Base

class PortfolioItem(Base):
    __tablename__ = "portfolio_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=False)
    tech_stack = Column(String(255), nullable=False)  # Stored as comma-separated values
    project_url = Column(String(255), nullable=True)
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, index=True)
    subject = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    received_at = Column(DateTime, default=datetime.datetime.utcnow)
`
  },
  {
    path: 'app/schemas.py',
    name: 'schemas.py',
    language: 'python',
    description: 'Pydantic schemas providing rigorous runtime request validation and serialization output definitions.',
    content: `from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field

# Base Pydantic class
class ContactMessageBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, examples=["John Doe"])
    email: EmailStr = Field(..., examples=["john@example.com"])
    subject: str = Field(..., min_length=3, max_length=150, examples=["Collab Opportunity"])
    message: str = Field(..., min_length=10, max_length=2000, examples=["Hello, I would love to collaborate on a project."])

# Creation Schema
class ContactMessageCreate(ContactMessageBase):
    pass

# Response Schema
class ContactMessageResponse(ContactMessageBase):
    id: int
    is_read: bool
    received_at: datetime

    class Config:
        from_attributes = True

# Portfolio Schemas
class PortfolioItemBase(BaseModel):
    title: str
    description: str
    tech_stack: List[str]
    project_url: Optional[str] = None
    is_featured: bool = False

class PortfolioItemCreate(PortfolioItemBase):
    pass

class PortfolioItemResponse(PortfolioItemBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
`
  },
  {
    path: 'app/crud.py',
    name: 'crud.py',
    language: 'python',
    description: 'Data Access Object pattern implementation supplying reusable asynchronous SQL database operations.',
    content: `from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import PortfolioItem, ContactMessage
from app.schemas import ContactMessageCreate, PortfolioItemCreate

async def get_featured_portfolio_items(db: AsyncSession):
    result = await db.execute(
        select(PortfolioItem).where(PortfolioItem.is_featured == True)
    )
    return result.scalars().all()

async def get_all_portfolio_items(db: AsyncSession):
    result = await db.execute(select(PortfolioItem))
    return result.scalars().all()

async def create_portfolio_item(db: AsyncSession, item: PortfolioItemCreate):
    db_item = PortfolioItem(
        title=item.title,
        description=item.description,
        tech_stack=",".join(item.tech_stack),
        project_url=item.project_url,
        is_featured=item.is_featured
    )
    db.add(db_item)
    await db.flush()
    return db_item

async def create_contact_message(db: AsyncSession, msg: ContactMessageCreate):
    db_msg = ContactMessage(
        name=msg.name,
        email=msg.email,
        subject=msg.subject,
        message=msg.message
    )
    db.add(db_msg)
    await db.flush()
    return db_msg
`
  },
  {
    path: 'app/main.py',
    name: 'main.py',
    language: 'python',
    description: 'FastAPI application configuration: middleware, lifecycle events, global error catching, and routing.',
    content: `from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.database import get_db
from app.schemas import ContactMessageCreate, ContactMessageResponse, PortfolioItemResponse
from app import crud

# Create application
app = FastAPI(
    title="Bipika's Backend Portfolio Services",
    description="A modern, high-performance, asynchronous REST API for developer portfolios.",
    version="1.0.0"
)

# Configure CORS for secure browser communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, lock this down to authorized origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health", status_code=status.HTTP_200_OK)
async def health_check():
    """Simple status check API."""
    return {"status": "healthy", "service": "portfolio-backend", "engine": "FastAPI"}

@app.get("/api/portfolio", response_model=List[PortfolioItemResponse])
async def read_portfolio_items(db: AsyncSession = Depends(get_db)):
    """Fetch all active portfolio items from PostgreSQL database."""
    items = await crud.get_all_portfolio_items(db)
    # Convert tech_stack string back to list
    formatted_items = []
    for item in items:
        # Construct item representation
        formatted_items.append({
            "id": item.id,
            "title": item.title,
            "description": item.description,
            "tech_stack": item.tech_stack.split(",") if item.tech_stack else [],
            "project_url": item.project_url,
            "is_featured": item.is_featured,
            "created_at": item.created_at
        })
    return formatted_items

@app.post("/api/contact", response_model=ContactMessageResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact_form(message: ContactMessageCreate, db: AsyncSession = Depends(get_db)):
    """Submit a message directly into our database securely."""
    try:
        db_message = await crud.create_contact_message(db, message)
        return db_message
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database insertion failed: {str(e)}"
        )
`
  },
  {
    path: 'migrations/env.py',
    name: 'env.py',
    language: 'python',
    description: 'Alembic migration configuration environment file script, handling database discovery and metadata inspection for migrations.',
    content: `import asyncio
from logging.config import fileConfig
from sqlalchemy import pool
from sqlalchemy.ext.asyncio import async_engine_from_config
from alembic import context

# Alembic Config object
config = context.config

# Interpret config file for logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Import our database Base and Models for metadata auto-generation
from app.database import Base
from app.models import PortfolioItem, ContactMessage
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def do_run_migrations(connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()

async def run_migrations_online() -> None:
    """Run migrations in 'online' mode using asynchronous drivers."""
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()

if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
`
  },
  {
    path: 'alembic.ini',
    name: 'alembic.ini',
    language: 'ini',
    description: 'Alembic database migration environment and version control options definition.',
    content: `[alembic]
script_location = migrations
prepend_sys_path = .
version_locations = %(here)s/migrations/versions
sqlalchemy.url = postgresql+asyncpg://postgres:securepassword@localhost:5432/portfolio_db

[post_write_hooks]

[loggers]
keys = root,sqlalchemy,alembic

[handlers]
keys = console

[formatters]
keys = generic

[logger_root]
level = WARNING
handlers = console
qualname =

[logger_sqlalchemy]
level = WARNING
handlers =
qualname = sqlalchemy.engine

[logger_alembic]
level = INFO
handlers =
qualname = alembic

[handler_console]
class = StreamHandler
args = (sys.stdout,)
level = NOTSET
formatter = generic

[formatter_generic]
format = %(levelname)-5.5s [%(name)s] %(message)s
datefmt = %H:%M:%S
`
  }
];
