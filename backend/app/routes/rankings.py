from fastapi import APIRouter, HTTPException, Query
from typing import List
from ..schemas import SchoolItem, IndicatorItem, ComparisonResponse
from ..services import rankings as rankings_service

router = APIRouter()

@router.get("/api/rankings/search-schools", response_model=List[SchoolItem])
async def search_schools(q: str = ""):
    if not q or not q.strip():
        return []
        
    results = await rankings_service.search_schools(q)
    return [SchoolItem(**res) for res in results]


@router.get("/api/rankings/indicators", response_model=List[IndicatorItem])
async def get_indicators():
    results = rankings_service.get_indicators()
    return [IndicatorItem(**res) for res in results]


@router.get("/api/rankings/comparison", response_model=ComparisonResponse)
async def get_comparison(school_code: str, indicators: str):
    indicator_ids = [ind.strip() for ind in indicators.split(",") if ind.strip()]
    
    if len(indicator_ids) > 5:
        raise HTTPException(status_code=400, detail="최대 5개의 지표만 선택할 수 있습니다.")
        
    invalid_inds = [ind for ind in indicator_ids if ind not in rankings_service.INDICATOR_MAP]
    if invalid_inds:
        raise HTTPException(status_code=400, detail=f"잘못된 지표 ID입니다: {', '.join(invalid_inds)}")
        
    result = await rankings_service.get_comparison(school_code, indicator_ids)
    
    if result is None:
        raise HTTPException(status_code=404, detail="해당 학교 또는 데이터를 찾을 수 없습니다.")
        
    return ComparisonResponse(**result)
