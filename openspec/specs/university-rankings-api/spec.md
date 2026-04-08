# University Rankings API

## Purpose
`tstt_ind` 테이블(3주기 연도별 대학현황지표)의 풍부한 데이터를 프론트엔드 대시보드에 구조화된 형태로 공급하기 위한 REST API를 정의한다. 이를 통해 대학 검색, 지표 목록 로드, 그리고 특정 대학의 지표별 순위 비교 기능을 지원한다.

## Requirements

### Requirement: University name autocomplete search
The system SHALL provide an endpoint to search university names for autocomplete, returning distinct school names and codes matching the query string.

#### Scenario: Successful autocomplete search
- **WHEN** a GET request is made to `/api/rankings/search-schools?q=서울` with a non-empty query string
- **THEN** the system SHALL return HTTP 200 with a JSON array of objects containing `school_name` and `school_code`, limited to 20 results, matching universities whose names contain the query string

#### Scenario: Empty query returns empty list
- **WHEN** a GET request is made to `/api/rankings/search-schools?q=` with an empty or whitespace-only query
- **THEN** the system SHALL return HTTP 200 with an empty JSON array `[]`

#### Scenario: No matching universities
- **WHEN** a GET request is made to `/api/rankings/search-schools?q=존재하지않는대학교`
- **THEN** the system SHALL return HTTP 200 with an empty JSON array `[]`

---

### Requirement: Indicator list retrieval
The system SHALL provide an endpoint that returns the list of all available ranking indicators from `tstt_ind`, with their column identifiers and human-readable Korean labels.

#### Scenario: Successful indicator list retrieval
- **WHEN** a GET request is made to `/api/rankings/indicators`
- **THEN** the system SHALL return HTTP 200 with a JSON array of objects, each containing `id` (column name ending in `_rank`) and `label` (Korean description of the indicator)

#### Scenario: Indicator list is always available
- **WHEN** a GET request is made to `/api/rankings/indicators`
- **THEN** the system SHALL return a non-empty list of at least 1 indicator regardless of database state, as the list is defined as a code constant

---

### Requirement: University ranking comparison data
The system SHALL provide an endpoint to retrieve ranking data for a specific university across selected indicators, using the most recent year's data.

#### Scenario: Successful comparison data retrieval
- **WHEN** a GET request is made to `/api/rankings/comparison?school_code=S001&indicators=employment_rate_rank,scholarship_ratio_rank`
- **THEN** the system SHALL return HTTP 200 with `school_name`, `year`, and a `rankings` array, where each item contains the `indicator` id, raw `value` of the base metric, and `rank` (integer position)

#### Scenario: Invalid indicator id is rejected
- **WHEN** a GET request is made to `/api/rankings/comparison` with an `indicators` value not in the allowed whitelist
- **THEN** the system SHALL return HTTP 400 with a detail message listing the invalid indicator ids

#### Scenario: Unknown school_code returns 404
- **WHEN** a GET request is made to `/api/rankings/comparison` with a `school_code` that does not exist in `tstt_ind`
- **THEN** the system SHALL return HTTP 404 with a detail message indicating the school was not found

#### Scenario: More than 5 indicators are rejected
- **WHEN** a GET request is made to `/api/rankings/comparison` with more than 5 comma-separated indicator ids
- **THEN** the system SHALL return HTTP 400 with a detail message stating the maximum is 5 indicators
