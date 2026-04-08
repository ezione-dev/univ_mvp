## Context

`backend/app/` 구조는 FastAPI 기반이며, `asyncpg` 풀을 통해 PostgreSQL에 직접 연결한다. 현재 유일한 데이터 API는 LLM 체인(`/api/query`)이며, 구조화된 데이터를 반환하는 전용 엔드포인트가 없다. `tstt_ind` 테이블은 200여 개 대학의 연도별 지표 데이터와 각 지표의 전체 순위(`_rank`)를 보유한다. PK는 `(year, school_code)`이며 `school_name` 인덱스가 존재한다.

## Goals / Non-Goals

**Goals:**
- `tstt_ind` 테이블을 직접 SELECT하는 낮은 레이턴시 REST API 3종 제공
- LLM 경유 없이 구조화된 응답으로 프론트엔드 데이터 공급
- FastAPI의 기존 DB 풀(`get_pool`) 재사용으로 인프라 추가 없음

**Non-Goals:**
- 인증/권한 처리 (현재 프로젝트 전반에 없음)
- 쓰기(INSERT/UPDATE/DELETE) 작업
- 프론트엔드 컴포넌트 구현 (별도 변경으로 관리)
- 연도 필터링 (항상 최신 연도 사용, 향후 확장 포인트)

## Decisions

### 1. 라우터 분리 (`rankings.py`)

기존 `query.py`와 역할이 전혀 다르므로 `routes/rankings.py`로 신규 파일을 분리한다. `main.py`에 prefix 없이 include하여 URL이 `/api/rankings/...`가 되도록 한다.

**대안:** `query.py`에 추가 — 파일이 비대해지고 역할이 혼재되어 기각.

### 2. 서비스 레이어 분리 (`services/rankings.py`)

DB 쿼리 로직을 라우터가 아닌 서비스 파일로 분리하여 테스트 가능성과 재사용성을 확보한다. `get_pool()`을 직접 호출하는 방식으로 기존 패턴을 따른다.

### 3. 지표 목록은 코드 상수로 정의

`tstt_ind`의 `_rank` 컬럼 목록과 한글 레이블을 `services/rankings.py` 내 Python 상수로 정의한다. DB 메타데이터에서 동적으로 읽는 방식보다 관리가 단순하고, 지표 추가/제거 시 명시적 변경이 필요하여 안전하다.

**대안:** information_schema에서 동적 조회 — 런타임 오버헤드, 불필요한 복잡도로 기각.

### 4. 최신 연도 자동 선택

비교 데이터 API(`/api/rankings/comparison`)에서 연도 파라미터를 받지 않고 `MAX(year)`를 자동으로 사용한다. 향후 연도 파라미터 추가가 쉬운 구조로 설계한다.

### 5. SQL Injection 방지

지표 컬럼명은 클라이언트에서 받는 파라미터이므로, 허용된 컬럼 화이트리스트(`INDICATOR_MAP` 키)와 대조 후 SQL에 삽입한다. asyncpg의 파라미터 바인딩은 컬럼명에 적용이 불가하므로 이 방식이 유일한 안전한 방법이다.

## Risks / Trade-offs

- **[Risk]** 지표 컬럼명 화이트리스트 누락 시 400 오류 대신 500이 발생할 수 있음
  - → Mitigation: 라우터에서 사전 검증 후 명확한 400 응답 반환
- **[Risk]** `tstt_ind` 데이터가 없거나 특정 대학의 지표값이 NULL인 경우
  - → Mitigation: NULL 허용 컬럼이므로 응답에 `null`로 그대로 포함
- **[Trade-off]** 지표 목록을 코드 상수로 관리하면 DB 스키마 변경 시 코드도 함께 수정해야 함
  - → 허용 가능, 지표 추가는 명시적 행위여야 함
