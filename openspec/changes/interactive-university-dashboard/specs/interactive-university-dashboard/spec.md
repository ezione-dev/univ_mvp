## ADDED Requirements

### Requirement: Real-time University Search
The system SHALL provide a search interface that allows users to find and select a university, with autocomplete results fetched from the `/api/rankings/search-schools` endpoint.

#### Scenario: User searches for a university
- **WHEN** the user types "서울" in the search input
- **THEN** after a 300ms debounce, the system SHALL call the search API and display a list of matching universities
- **THEN** selecting a university SHALL update the global dashboard state and trigger a data refresh

---

### Requirement: Multi-Indicator Selection with Limit
The system SHALL allow users to select up to 5 ranking indicators from a list fetched from the `/api/rankings/indicators` endpoint.

#### Scenario: User selects indicators
- **WHEN** the user clicks an unselected indicator chip
- **THEN** the indicator SHALL be added to the selection list, and if the total selected is less than or equal to 5, the UI SHALL highlight the chip
- **THEN** clicking a selected chip SHALL remove it from the list

#### Scenario: Selection limit enforcement
- **WHEN** 5 indicators are already selected
- **THEN** all other unselected indicators SHALL be disabled or provide visual feedback that no more can be selected

---

### Requirement: Dynamic Dashboard Visualization
The system SHALL automatically update all dashboard components (Rankings Heatmap, Institution Summary) whenever the selected school or indicators change, by fetching data from the `/api/rankings/comparison` endpoint.

#### Scenario: Visualization update on selection change
- **WHEN** a new university is selected OR the indicator list is modified
- **THEN** the system SHALL call the comparison API with the new parameters
- **THEN** the `RankingHeatmapCard` SHALL update its columns and markers to reflect the new ranking data
- **THEN** the `InstitutionSummaryPanel` SHALL update its content to reflect the new university's metadata

#### Scenario: Loading state indication
- **WHEN** a data refresh is in progress
- **THEN** affected components SHALL display a loading indicator or skeleton screen to inform the user
