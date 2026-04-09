## ADDED Requirements

### Requirement: Main layout provides consistent header
The MainLayout component SHALL provide a sticky header with logo, navigation tabs, and user menu that wraps the main page content.

#### Scenario: Header displays correctly
- **WHEN** the page loads
- **THEN** header shows "Scholar Metric Dashboard" logo
- **AND** navigation tabs display (일반현황, 입시/충원, 학생/취업, 교육/교원, 연구/산학, 재정/장학, 캠퍼스/복지, 거버넌스)
- **AND** user menu shows notifications, settings, and profile icons

#### Scenario: Active tab indicator
- **WHEN** a navigation tab is active
- **THEN** the tab shows border-b-2 border-secondary text in secondary color (#006492)

#### Scenario: Navigation tabs are disabled
- **WHEN** the user clicks a navigation tab
- **THEN** no navigation occurs (buttons are disabled/non-functional)

### Requirement: Header styling matches design system
The header SHALL use the DESIGN.md color system with atmospheric depth approach.

#### Scenario: Header background
- **WHEN** the page loads
- **THEN** header uses bg-surface-container-low (#f1f4f7) background
- **AND** shadow uses on-surface (#181c1e) at 4% opacity with 32px blur and 8px Y-offset

#### Scenario: Logo styling
- **WHEN** the page loads
- **THEN** logo text uses primary color (#002c5a)
- **AND** font uses Manrope font family
