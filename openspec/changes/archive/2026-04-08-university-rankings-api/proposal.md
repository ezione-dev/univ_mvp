## Why

대학 순위 비교 대시보드 홈 화면 구現을 위해, `tstt_ind` 테이블(3주기 연도별 대학현황지표)의 데이터를 프론트엔드에 공급하는 전용 REST API가 필요하다. 현재 백엔드는 LLM 기반 자연어 쿼리 API(`/api/query`)만 존재하며, 대학 검색·지표 목록 조회·순위 데이터 조회를 위한 구조화된 데이터 API가 없다.

## What Changes

- **새 라우터 추가**: `backend/app/routes/rankings.py` — 대학 순위 관련 3개 엔드포인트 제공
- **새 서비스 추가**: `backend/app/services/rankings.py` — DB 쿼리 로직 분리
- **스키마 확장**: `backend/app/schemas.py` — 새 엔드포인트용 Request/Response 모델 추가
- **앱 라우터 등록**: `backend/app/main.py`에 rankings 라우터 include

## Capabilities

### New Capabilities
- `university-rankings-api`: `tstt_ind` 테이블을 기반으로 대학 검색, 지표 목록, 순위 비교 데이터를 제공하는 REST API 3종

### Modified Capabilities
- (없음)

## Impact

- **백엔드**: `routes/`, `services/`, `schemas.py`, `main.py` 변경
- **DB**: `tstt_ind` 테이블을 직접 SELECT (LLM 경유 없음, 낮은 레이턴시)
- **프론트엔드**: 이 API를 호출하는 컴포넌트는 이후 단계에서 구현 (이번 범위 밖)
- **기존 API**: `/api/query`는 변경 없음
