## 1. 서비스 레이어 구현

- [x] 1.1 `backend/app/services/rankings.py` 파일 생성
- [x] 1.2 `INDICATOR_MAP` 상수 정의 — `_rank` 컬럼명 → 한글 레이블 매핑 (DDL 기준 전체 지표)
- [x] 1.3 `search_schools(q: str)` 함수 구현 — `tstt_ind`에서 `school_name ILIKE %q%` 쿼리, DISTINCT, 최대 20건 반환
- [x] 1.4 `get_indicators()` 함수 구현 — `INDICATOR_MAP`을 `{id, label}` 리스트로 반환
- [x] 1.5 `get_comparison(school_code: str, indicator_ids: list[str])` 함수 구현 — 최신 연도 자동 선택(MAX year), 지정된 지표 컬럼 동적 SELECT, 학교 없으면 None 반환

## 2. 스키마 확장

- [x] 2.1 `backend/app/schemas.py`에 `SchoolItem(school_name, school_code)` 모델 추가
- [x] 2.2 `IndicatorItem(id, label)` 모델 추가
- [x] 2.3 `RankingItem(indicator, value, rank)` 모델 추가
- [x] 2.4 `ComparisonResponse(school_name, year, rankings)` 모델 추가

## 3. 라우터 구현

- [x] 3.1 `backend/app/routes/rankings.py` 파일 생성
- [x] 3.2 `GET /api/rankings/search-schools` 엔드포인트 구현 — `q` 파라미터 수신, 빈 문자열이면 `[]` 반환
- [x] 3.3 `GET /api/rankings/indicators` 엔드포인트 구현 — 지표 목록 반환
- [x] 3.4 `GET /api/rankings/comparison` 엔드포인트 구현 — `school_code`, `indicators` 파라미터 수신, 5개 초과 시 400, 잘못된 indicator id 시 400, 학교 없음 시 404

## 4. 앱 등록 및 검증

- [x] 4.1 `backend/app/main.py`에 `rankings` 라우터 include
- [x] 4.2 `GET /api/rankings/search-schools?q=서울` 수동 테스트 — 결과 확인
- [x] 4.3 `GET /api/rankings/indicators` 수동 테스트 — 전체 지표 목록 확인
- [x] 4.4 `GET /api/rankings/comparison?school_code=<코드>&indicators=employment_rate_rank,scholarship_ratio_rank` 수동 테스트 — 정상 응답 확인
- [x] 4.5 잘못된 indicator id로 요청 시 400 응답 확인
- [x] 4.6 6개 이상 indicator 요청 시 400 응답 확인
