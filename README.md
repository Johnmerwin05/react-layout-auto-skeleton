# react-layout-auto-skeleton

Layout-aware skeleton loading for React 18/19. It measures the component already in the DOM and draws an inert overlay from its semantic leaves—no hand-built duplicate skeleton and no UI-framework dependency.

## Install

```bash
pnpm add react-layout-auto-skeleton
# or: npm install react-layout-auto-skeleton / yarn add react-layout-auto-skeleton
```

```tsx
import { AutoSkeleton } from 'react-layout-auto-skeleton';
import 'react-layout-auto-skeleton/styles.css';

<AutoSkeleton loading={isLoading} cacheKey="employee-card">
  <EmployeeCard employee={employee} />
</AutoSkeleton>
```

The child mounts once. The package measures visible headings, text, images, avatars, controls, SVGs, canvases, table cells, and custom leaves. Structural flex/grid containers remain intact as measured geometry rather than becoming large blocks.

## Configuration

```tsx
<AutoSkeletonProvider animation="shimmer" duration={1.5} theme="auto">
  <AutoSkeleton loading={pending} baseColor="#e5e7eb" highlightColor="#f8fafc"
    borderRadius="auto" preserveLayout cacheKey="dashboard" tableRows={5}>
    <Dashboard />
  </AutoSkeleton>
</AutoSkeletonProvider>
```

| Prop | Type | Default |
|---|---|---|
| `loading` | `boolean` | required |
| `animation` | `shimmer \| pulse \| wave \| none` | `shimmer` |
| `duration` | `number` (seconds) | `1.5` |
| `baseColor`, `highlightColor` | CSS color | gray palette |
| `borderRadius` | CSS radius or `auto` | `auto` |
| `cache`, `cacheKey` | `boolean`, `string` | `true`, unset |
| `maxDepth` | `number` | `12` |
| `exclude` | CSS selector | unset |
| `loadingDelay`, `minimumDuration`, `transitionDuration` | milliseconds | `0`, `0`, `180` |
| `minWidth`, `minHeight` | pixels | `16`, `12` |
| `responsive` | `boolean` | `true` |
| `theme` | `light \| dark \| auto` | `auto` |
| `fallback` | `ReactNode` | generic block |
| `placeholderData` | `ReactNode` | unset; first-load fallback alias |

Provider values are optional and local props override them. `useAutoSkeleton`, `analyzeDOM`, `SkeletonRenderer`, and `skeletonCache` are exported for advanced integrations.

## Element overrides

```tsx
<div data-skeleton-ignore>Decorative content</div>
<img data-skeleton-shape="circle" alt="" />
<p data-skeleton-lines="3">Description</p>
<div data-skeleton-width="80%" data-skeleton-height="24" data-skeleton-radius="8px" />
<div data-skeleton-preserve>{/* represent this container itself */}</div>
```

## Data loading recipes

TanStack Query (the same pattern works with SWR, Axios, fetch, and React state):

```tsx
const { data, isLoading } = useQuery({ queryKey: ['employees'], queryFn: fetchEmployees });
return <AutoSkeleton loading={isLoading} cacheKey="employees" fallback={<EmployeeTableShell rows={5} />}>
  <EmployeeTable data={data ?? []} />
</AutoSkeleton>;
```

Cards, forms, lists, product grids, profiles, navigation, sidebars, dialogs, charts, nested dashboards, native tables, TanStack Table, and shadcn DataTable all use the same wrapper. Canvas/SVG charts become a block matching their container. For an empty first-load table, render stable headers and placeholder rows from the application, or pass a `fallback`; once measured, `cacheKey` supplies subsequent loads.

## SSR and Next.js

Browser APIs run only in effects, so server rendering is safe and produces the normal child wrapper without a hydration fork. In the App Router, import this package from a client component. CSS must be imported from a client/global stylesheet entry. The same behavior applies to Vite SPA and Inertia React clients.

## Performance and accessibility

Measurements are batched by observer callbacks and unchanged signatures do not rerender. Resize and mutation observers are cleaned up; there is no polling or DOM cloning. During loading the wrapper uses `aria-busy`, hides content from assistive technology, makes it inert, and marks the overlay decorative. Animations respect `prefers-reduced-motion`.

## First-load limitations

DOM measurement cannot infer content that does not exist. Keep layout-bearing shells mounted, use realistic placeholder rows/data owned by your app, provide `fallback`, or reuse a `cacheKey`. The library deliberately never mounts a second hidden copy because doing so can duplicate requests, subscriptions, analytics, and effects. The memory cache stores geometry only—not text or sensitive content—and naturally resets on reload. Use distinct cache keys when breakpoints produce materially different structures, or call `skeletonCache.delete(key)` after a redesign.

## Development

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm test
pnpm lint
pnpm build
```

The Vite playground includes a responsive dashboard, table, chart, cards, theme and animation controls, and side-by-side reference. Publish with `pnpm build` then `npm publish --dry-run`; this repository never publishes automatically.

## Troubleshooting

- No detailed shapes on first load: the subtree has no measurable leaves; add a stable shell or fallback.
- A decorative leaf appears: add `data-skeleton-ignore` or `exclude`.
- A custom container is omitted: add `data-skeleton-preserve`.
- Stale geometry: use a breakpoint-specific key or invalidate it with `skeletonCache.delete`.
- CSS missing: import `react-layout-auto-skeleton/styles.css` once.

MIT licensed. React is a peer dependency; the runtime has no third-party dependencies.
