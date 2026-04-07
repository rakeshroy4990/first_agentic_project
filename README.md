# Vue + Spring Boot Component Annotation Project

This project contains:
- `frontend/`: Vue 3 + Vite UI app
- `backend/`: Spring Boot API
- `shared/`: framework-agnostic JSON Schema + sample annotation

## UI Architecture

Frontend rendering follows a framework-agnostic pipeline:
- annotation config (JSON) is fetched at runtime
- TypeScript compiler (`frontend/src/core/compiler.ts`) converts config into neutral UI nodes
- Vue adapter (`frontend/src/adapters/vue/UiNodeRenderer.ts`) turns nodes into minimal HTML

To move to React/Angular in future, keep the compiler and replace only the adapter layer.

### Page Config to Angular Component Artifacts

Added page architecture files:
- `frontend/src/page/page-types.ts`: `BasePage` + `PageConfig` (packageName, pageId, actions, events, listeners)
- `frontend/src/page/page-config.sample.ts`: sample config with design-system and custom components
- `frontend/src/page/angular-page-compiler.ts`: runtime compiler to Angular-style artifacts
- `frontend/src/page/generate-page-artifacts.ts`: runtime entry to generate `page.component.ts/html/scss` strings

The generated HTML includes dynamic values from `page.component.ts`, including `uiStoreSlot`.

### Component Architecture (Button, Icon Button, Dropdown, Popup)

Added the same config -> runtime compiler architecture for components:
- `frontend/src/components/button/*`: button types, sample config, compiler
- `frontend/src/components/icon-button/*`: icon-button types, sample config, compiler
- `frontend/src/components/dropdown/*`: dropdown types, sample config, compiler
- `frontend/src/components/popup/*`: popup types, sample config, compiler
- `frontend/src/components/shared/*`: shared base types + artifact helpers
- `frontend/src/components/generate-component-artifacts.ts`: runtime generator for all component artifact sets

Each component config includes `packageName` and `sourceType`, so components can come from a design system package or custom package.

## JSON Schema

The annotation schema is at:
- `shared/ui-component-annotation.schema.json`

It models a UI component with:
- component type
- data bindings
- validation rules
- RBAC visibility/enabled logic
- API endpoint references
- event hooks
- extension points for any frontend framework

Sample document:
- `shared/sample-annotation.json`

## Run Backend (Spring Boot + Gradle Wrapper)

Requirements:
- Java 17+

Commands:
```bash
cd backend
./gradlew bootRun
```

API endpoint:
- `GET http://localhost:8080/api/components/sample`

## Run Frontend (Vue)

Requirements:
- Node.js 18+
- Pinia (installed via npm dependency)

Commands:
```bash
cd frontend
npm install
npm run dev
```

Open:
- `http://localhost:5173`

The frontend calls `/api/components/sample` using the Vite proxy to the Spring Boot API.
State is managed through Pinia store modules in `frontend/src/stores/`.

## Dynamic Header (Server Driven)

- Backend endpoint: `GET /api/components/uiMetadata/{uniqueId}`
- Frontend store: `frontend/src/stores/header.ts`
- Header component: `frontend/src/components/header/HeaderBar.vue`

Server returns:
- `uniqueId`
- `data.header`
- `data.menu`
- `data.body`
- `data.footer`

Frontend requests metadata using page `uniqueId`, and feeds the returned data to matching UI sections (header/menu/body/footer).

## Start Both Services With One Script

From project root:

```bash
./start-dev.sh
```

What it does:
- starts backend (`./gradlew bootRun`) and frontend (`npm run dev`)
- checks ports `8080` and `5173`
- if occupied, kills those processes first and then starts both services

Optional custom ports:

```bash
BACKEND_PORT=8081 FRONTEND_PORT=5174 ./start-dev.sh
```
