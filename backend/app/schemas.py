from pydantic import BaseModel
from typing import Any, Optional


class QueryRequest(BaseModel):
    question: str


class QueryResponse(BaseModel):
    data: Optional[list[dict[str, Any]]] = None
    sql: Optional[str] = None
    message: Optional[str] = None


class SchoolItem(BaseModel):
    school_name: str
    school_code: str
    establishment_type: str
    region: str


class IndicatorItem(BaseModel):
    id: str
    label: str


class RankingItem(BaseModel):
    indicator: str
    value: Any
    rank: Optional[int]


class ComparisonResponse(BaseModel):
    school_name: str
    year: int
    rankings: list[RankingItem]
