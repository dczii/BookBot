# SnapBook — React Native + Expo + Convex

## Project Overview
SnapBook is a photobook printing mobile app for the Philippine market. Built with React Native (Expo) for the frontend and Convex for the backend. Deployed via Expo Application Services (EAS).

**Tagline:** "Print Your Memories"
**Design philosophy:** Warmth first (cozy café feel), Photo-centric, Filipino-native (GCash, COD, barangay addresses)

## Tech Stack
- **Frontend:** React Native 0.81, Expo SDK 54, TypeScript 5.9
- **Backend:** Convex (serverless database, real-time queries, mutations, actions)
- **Navigation:** React Navigation (native stack)
- **Fonts:** Playfair Display (headlines), DM Sans (body/UI)
- **Styling:** React Native StyleSheet with espresso theme in `src/constants/theme.ts`
- **Deployment:** Expo / EAS Build + EAS Update

## Brand Design System
- **Light palette:** Espresso #2C1810, Mocha #5C3423, Caramel #B5621E (primary), Toffee #D4855A, Latte #F2E8DC, Cream #FAF4EC
- **Dark palette:** Dark Roast #0D0806, Deep Brew #160D08, Roasted #2A1710, Toffee #D4855A, Latte #C4A08A, Steamed #F5E6D3
- **Typography:** Playfair Display Bold (display/headlines), DM Sans 400 (body), DM Sans 600 (UI labels/buttons)

## App Flow
```
Splash (1.2s) → Onboarding (3 steps, new users) → Auth (Login/Sign Up) → Home
              → Home (returning users, via AsyncStorage check)
```

## Project Structure
```
SnapBook/
├── App.tsx                  # Root: fonts, NavigationContainer, RootNavigator
├── convex/                  # Convex backend
│   ├── schema.ts            # Database schema
│   ├── books.ts             # Queries & mutations for books
│   └── tsconfig.json        # Convex TS config
├── src/
│   ├── screens/             # SplashScreen, OnboardingScreen, AuthScreen, HomeScreen
│   ├── components/          # Button, TextInput, PageIndicator, SegmentedControl, SocialButton
│   ├── navigation/          # RootNavigator (native stack)
│   ├── hooks/               # useTheme, useConvex
│   ├── constants/           # theme (espresso palette), storage keys
│   └── types/               # navigation params, theme types
├── assets/                  # Images, fonts, icons
├── .claude/agents/          # Claude agent definitions
└── app.json                 # Expo config
```

## Conventions

### Code Style
- Use TypeScript strict mode everywhere
- Use functional components with hooks (no class components)
- Export components as named exports, screens as default exports
- Use `StyleSheet.create()` for all styles — no inline style objects
- Prefer `const` over `let`; never use `var`

### Naming
- Components & screens: PascalCase (`BookCard.tsx`, `HomeScreen.tsx`)
- Hooks: camelCase prefixed with `use` (`useBooks.ts`)
- Convex functions: camelCase (`books.ts` → `list`, `add`, `remove`)
- Types/interfaces: PascalCase with no `I` prefix (`Book`, `UserProfile`)
- Constants: UPPER_SNAKE_CASE for primitives, PascalCase for objects

### Convex
- Schema defined in `convex/schema.ts` — single source of truth
- One file per domain (e.g., `convex/books.ts`, `convex/users.ts`)
- Use validators (`v.string()`, `v.number()`, etc.) for all function args
- Always add indexes for fields you query by
- Use `query` for reads, `mutation` for writes, `action` for external API calls

### Navigation
- Define navigators in `src/navigation/`
- Use typed navigation with `RootStackParamList`
- Screen names match file names (e.g., `Home` → `HomeScreen.tsx`)

### Testing
- Test files live next to source: `Component.test.tsx`
- Use React Native Testing Library for component tests
- Use Convex test utilities for backend function tests

## Commands
```bash
npm start          # Start Expo dev server
npm run android    # Start on Android
npm run ios        # Start on iOS
npm run web        # Start on web
npx convex dev     # Start Convex dev server (requires login)
npx convex deploy  # Deploy Convex to production
```

## Claude Agents
This project includes 7 specialized Claude agents in `.claude/agents/`:

### Orchestration
1. **project-manager.md** — Senior PM that breaks down features, assigns tasks to all agents, defines execution order, and tracks progress. Start here for any new feature.

### Implementation
2. **frontend.md** — React Native screens, components, navigation
3. **backend.md** — Convex schema, queries, mutations, actions
4. **design.md** — UI/UX, theming, styling, accessibility

### Quality
5. **code-reviewer.md** — Reviews frontend and backend code for correctness, security, performance, and convention adherence
6. **testing.md** — Unit tests, integration tests, E2E

### Infrastructure
7. **devops.md** — EAS builds, deployments, CI/CD, environment config

### Agent Pipeline
For any new feature, the Project Manager orchestrates this pipeline:
```
Backend → Design → Frontend → Code Review → Testing → DevOps
```
