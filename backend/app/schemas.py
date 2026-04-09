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


class OverviewUnit(BaseModel):
    xUnitCode: str
    yUnitCode: str


class OverviewMatrixPoint(BaseModel):
    id: str
    name: str
    x: float
    y: float
    colorHex: str
    quadrantCode: str
    quadrantName: str
    rawX: float
    rawY: float
    xDisplayText: str
    yDisplayText: str
    unit: OverviewUnit


class OverviewMatrixResponse(BaseModel):
    title: str
    xAxisLabel: str
    yAxisLabel: str
    points: list[OverviewMatrixPoint]


class RiskTableIndicator(BaseModel):
    code: str
    name: str
    year: int
    displayOrder: int


class RiskTableCell(BaseModel):
    valueNum: float
    displayText: str
    unitCode: str
    statusCode: str
    statusName: str
    colorHex: str
    comparisonDirectionCode: str


class RiskTableJudgment(BaseModel):
    displayText: str
    statusCode: str
    statusName: str
    colorHex: str


class RiskTableRow(BaseModel):
    indicator: RiskTableIndicator
    regional: RiskTableCell
    national: RiskTableCell
    overall: RiskTableJudgment


class RiskTableLegendItem(BaseModel):
    statusCode: str
    statusName: str
    colorHex: str


class OverviewRiskTableResponse(BaseModel):
    title: str
    items: list[RiskTableRow]
    legend: list[RiskTableLegendItem]


class OverviewKpiComparison(BaseModel):
    value: str
    status: str


class OverviewLargeKpiItem(BaseModel):
    id: str
    label: str
    value: str
    year: int
    accentColor: str
    regionalComparison: OverviewKpiComparison
    nationalComparison: OverviewKpiComparison


class OverviewSmallKpiItem(BaseModel):
    id: str
    label: str
    value: str
    subLabel: str
    status: str


class OverviewKpisResponse(BaseModel):
    large: list[OverviewLargeKpiItem]
    small: list[OverviewSmallKpiItem]


class OverviewDetailGridItem(BaseModel):
    metricCode: str
    metricName: str
    metricYear: int
    displayOrder: int
    metricUnitCode: str
    metricUnitName: str

    myValueNum: float
    myValueDisplay: str

    regionAvgNum: float
    regionAvgDisplay: str

    nationalAvgNum: float
    nationalAvgDisplay: str

    sourceTableName: str
    sourceColumnExpr: str


class OverviewDetailGridResponse(BaseModel):
    title: str
    items: list[OverviewDetailGridItem]


class OverviewProgressMetricItem(BaseModel):
    label: str
    current: str
    target: str
    percentage: int
    color: str


class OverviewProgressMetricsResponse(BaseModel):
    title: str
    items: list[OverviewProgressMetricItem]


class OverviewInsightsResponse(BaseModel):
    title: str
    strengths: Optional[str] = None
    risks: Optional[str] = None
    actions: list[str] = []


class InsightLine(BaseModel):
    no: int
    role: str
    text: str


class InsightBlock(BaseModel):
    code: str
    areaName: str
    title: str
    displayOrder: int
    lines: list[InsightLine] = []


class InsightCoreResponse(BaseModel):
    # 프론트 `InsightsPanel`과 호환되는 필드들
    title: str
    strengths: Optional[str] = None
    risks: Optional[str] = None
    actions: list[str] = []

    # 화면 레이아웃용 텍스트 (요청 block_code 기반)
    headerContext: Optional[str] = None
    summaryJudgment: Optional[str] = None

    # 원본 구조(블록/라인)도 함께 제공
    blocks: list[InsightBlock] = []
