# Frontend Routing Spec

## Purpose

Defines client-side routing for the frontend: public entry routes, support and not-found behavior, and **non-production-only** routes used for internal development (`/insights`, `/dashboard/legacy`). The app is served at the **site root** (Vite `base` `/`, no router `basename`); subdirectory deployment is not specified in this revision.

## Requirements

### Requirement: Application main route

The frontend SHALL register `/` as the primary landing route.

#### Scenario: Root shows main screen

- **WHEN** the user navigates to `/`
- **THEN** the application displays the main landing view (`MainPage`) including the visible title **메인화면**
- **AND** the view SHALL NOT include a link or button whose primary purpose is navigating to `/insights` or `/dashboard/legacy`

### Requirement: Support route

The frontend SHALL expose `/support` in all builds (development and production).

#### Scenario: Support path

- **WHEN** the user navigates to `/support`
- **THEN** the application displays the support view (`SupportPage`)

### Requirement: Insights route is non-production only

The frontend SHALL register `/insights` **only** when `import.meta.env.PROD` is false. In production builds the path SHALL NOT be registered, so it behaves as an unknown route.

#### Scenario: Development insights access

- **WHEN** `import.meta.env.PROD` is false
- **AND** the user navigates to `/insights`
- **THEN** the application displays the natural-language query and chart experience (`QueryPage`)
- **AND** API calls used by that experience SHALL continue to function

#### Scenario: Production insights URL

- **WHEN** `import.meta.env.PROD` is true
- **AND** the user navigates to `/insights`
- **THEN** no registered route matches that path
- **AND** the application displays the not-found view (404)

### Requirement: Legacy dashboard route is non-production only

The frontend SHALL register `/dashboard/legacy` **only** when `import.meta.env.PROD` is false, rendering the existing Scholar Metric dashboard layout and page (`DashboardLayout` / `DashboardPage`). In production builds the path SHALL NOT be registered.

#### Scenario: Development legacy dashboard access

- **WHEN** `import.meta.env.PROD` is false
- **AND** the user navigates to `/dashboard/legacy`
- **THEN** the application displays the Scholar Metric dashboard experience (same shell and page as implemented for that path)

#### Scenario: Production legacy URL

- **WHEN** `import.meta.env.PROD` is true
- **AND** the user navigates to `/dashboard/legacy`
- **THEN** no registered route matches that path
- **AND** the application displays the not-found view (404)

### Requirement: No production UI navigation to hidden dev routes

When `import.meta.env.PROD` is true, the application SHALL NOT render user-visible controls (e.g. `Link`, buttons, anchors) whose primary purpose is navigating to `/insights` or `/dashboard/legacy`.

#### Scenario: Main and global chrome

- **WHEN** `import.meta.env.PROD` is true
- **AND** the user views the main landing view or other registered screens
- **THEN** there is no visible control whose primary action is to open `/insights` or `/dashboard/legacy`

### Requirement: Unknown paths show not-found UI

The application SHALL render a dedicated not-found view for any path that is not explicitly defined by the router for the current build mode.

#### Scenario: Unmatched path

- **WHEN** the user navigates to a path that is not registered for the current build (e.g. arbitrary unknown segment, or `/insights` / `/dashboard/legacy` in production)
- **THEN** the application displays a not-found view (404)
- **AND** the application SHALL NOT automatically redirect the user to `/` solely because the path is unknown
