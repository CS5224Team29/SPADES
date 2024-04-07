import uuid
from datetime import datetime
from typing import List, Optional

from sqlalchemy import Column, DateTime, UniqueConstraint
from sqlmodel import Field, Session, SQLModel, create_engine

DATABASE_URL = "postgresql://spade:spade1234@spade.cnimg46gk1vv.us-east-1.rds.amazonaws.com:5432/postgres"
engine = create_engine(DATABASE_URL, pool_size=10, max_overflow=20)


def init_db():
    SQLModel.metadata.create_all(engine)


def get_session():
    return Session(engine)


def get_session_sync():
    return Session(engine)


class BaseTableFields(SQLModel):
    created_at: datetime = Field(default=datetime.utcnow(), nullable=False)
    # updated_at: datetime = Field(
    #     sa_column=Column(
    #         DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    #     )
    # )
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    is_deleted: Optional[bool] = Field(default=False)
    deleted_at: Optional[str] = Field()


class User(BaseTableFields, table=True):
    __tablename__ = "user"
    __table_args__ = (UniqueConstraint("id"),)
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, nullable=False)
    name: str = Field(nullable=False)
    email: str = Field(nullable=False)


class Tickers(BaseTableFields, table=True):
    __tablename__ = "tickers"
    __table_args__ = (UniqueConstraint("id"),)
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, nullable=False)
    symbol: str = Field(nullable=False)
    name: str = Field(nullable=False)
    industry: str = Field(nullable=False)
    website: str = Field(nullable=True)
    sector: str = Field(nullable=False)
    description: str = Field(nullable=False)


class TickerPrice(BaseTableFields, table=True):
    __tablename__ = "ticker_price"
    __table_args__ = (UniqueConstraint("id"),)
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, nullable=False)
    ticker_id: uuid.UUID = Field(foreign_key="tickers.id")
    open_price: float = Field(nullable=False)
    close_price: float = Field(nullable=False)
    high: float = Field(nullable=False)
    low: float = Field(nullable=False)
    volume: float = Field(nullable=False)
    date: datetime = Field(nullable=False)


class UserStocks(BaseTableFields, table=True):
    __tablename__ = "user_stock"
    __table_args__ = (UniqueConstraint("id"),)
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, nullable=False)
    ticker_id: uuid.UUID = Field(foreign_key="tickers.id")
    user_id: uuid.UUID = Field(foreign_key="user.id")
