# Build a Dynamic Auto-Generated Skeleton Loading Package for React + TypeScript

## 1. Project Overview

Develop a lightweight, reusable, production-ready npm package for React + TypeScript that automatically generates skeleton-loading placeholders based on the original component's structure, dimensions, shapes, spacing, and layout.

The primary goal is to eliminate the need to manually create skeleton components that replicate the appearance of actual UI components.

Instead of manually defining skeletons for cards, tables, dashboards, forms, and other UI elements, developers should be able to wrap an existing component with a skeleton provider or wrapper that automatically generates its skeleton-loading state.

## 2. Expected Developer Experience

The implementation should be as simple as:

```tsx
<AutoSkeleton loading={isLoading}>
  <EmployeeCard />
</AutoSkeleton>
```

For more complex components:

```tsx
<AutoSkeleton loading={isLoading}>
  <Dashboard />
</AutoSkeleton>
```

The package should automatically analyze the rendered component and generate skeleton placeholders that closely match its original layout.

When loading is complete, seamlessly display the original component without unnecessary layout shifts or visual flickering.

## 3. Core Requirements

### Automatic Component Detection

Automatically detect and replicate the following properties:

- Width and height
- Border radius
- Element shapes
- Text dimensions and line heights
- Padding, margins, and gaps
- Flexbox and grid layouts
- Element positioning
- Responsive dimensions
- Nested component structures
- Image and avatar aspect ratios

Use appropriate browser APIs, such as `ResizeObserver`, `MutationObserver`, `getBoundingClientRect()`, and `getComputedStyle()`, where necessary.

Preserve the original layout hierarchy instead of replacing the entire component with a single rectangular placeholder.

### Intelligent Element Recognition

Automatically identify different HTML elements and generate appropriate skeleton representations:

| Element    | Expected Skeleton                                |
| ---------- | ------------------------------------------------ |
| Heading    | Text-shaped placeholder                          |
| Paragraph  | Multiple text-line placeholders                  |
| Image      | Rectangle with matching aspect ratio             |
| Avatar     | Circular placeholder                             |
| Button     | Rounded rectangle                                |
| Input      | Matching input dimensions                        |
| Badge      | Small rounded placeholder                        |
| Icon       | Matching icon dimensions                         |
| Table      | Structured rows and columns                      |
| Card       | Preserved card layout with internal placeholders |
| Chart      | Placeholder matching chart container dimensions  |
| Navigation | Matching navigation item structure               |
| SVG        | Placeholder matching SVG dimensions              |

Avoid generating unnecessary skeleton placeholders for structural containers, decorative elements, and invisible elements.

### Initial Loading and Missing Data

Handle the scenario where the original component has not yet received its API data.

Do not assume that the actual dimensions of unrendered content can be measured.

Implement a reliable strategy using a combination of:

- Hidden or off-screen measurement rendering when appropriate.
- Optional placeholder or mock data.
- Cached measurements from previously rendered components.
- Configurable fallback dimensions.
- Layout-based inference.
- Explicit fallback components for unsupported scenarios.

The package must support both first-time loading and subsequent loading states.

Avoid duplicate API requests, unintended component side effects, duplicate subscriptions, and unnecessary mounting during measurement.

Document any technical limitations and explain when placeholder data or fallback configurations are required.

## 4. Supported Component Types

Ensure compatibility with:

- Cards and statistics cards
- Dashboards
- Data tables
- Forms
- Lists and grids
- User profiles
- Navigation bars
- Sidebars
- Modals and dialogs
- Charts and graphs
- Product cards
- Accordion components
- Tabs
- Custom React components
- Deeply nested components
- Responsive layouts

The package should work with native HTML elements and popular UI frameworks, including:

- Tailwind CSS
- shadcn/ui
- Material UI
- Bootstrap
- Chakra UI
- Custom CSS and CSS Modules

Avoid requiring any specific UI framework as a dependency.

## 5. Customization and Configuration

Provide a flexible, strongly typed configuration API.

Example:

```tsx
<AutoSkeleton
  loading={isLoading}
  animation="shimmer"
  duration={1.5}
  baseColor="#e5e7eb"
  highlightColor="#f3f4f6"
  borderRadius="auto"
  preserveLayout
  cacheKey="employee-card"
>
  <EmployeeCard />
</AutoSkeleton>
```

Support the following configuration options:

- Loading state
- Shimmer, pulse, wave, and no animation
- Animation duration
- Base and highlight colors
- Automatic and custom border radius
- Layout preservation
- Minimum placeholder dimensions
- Maximum traversal depth
- Element exclusion
- Custom fallback components
- Placeholder data
- Measurement caching
- Loading delay
- Minimum loading duration
- Transition duration
- Configurable table row count
- Responsive behavior

Provide sensible defaults so developers can use the package with minimal configuration.

## 6. Global Provider

Implement an optional global provider that allows developers to configure skeleton behavior across the entire application.

```tsx
<AutoSkeletonProvider animation="shimmer" duration={1.5} theme="auto">
  <App />
</AutoSkeletonProvider>
```

Individual components should be able to override global configurations.

The provider should be optional and should not be required for basic usage.

## 7. Element-Level Customization

Allow developers to customize skeleton behavior using optional HTML data attributes.

```tsx
<div data-skeleton-ignore>
    This element should not generate a placeholder.
</div>

<div data-skeleton-shape="circle">
    <Avatar />
</div>

<div data-skeleton-width="80%">
    <p>Dynamic content</p>
</div>

<div data-skeleton-lines="3">
    <Description />
</div>
```

Support attributes such as:

- `data-skeleton-ignore`
- `data-skeleton-shape`
- `data-skeleton-width`
- `data-skeleton-height`
- `data-skeleton-radius`
- `data-skeleton-lines`
- `data-skeleton-preserve`

These attributes should be optional overrides rather than mandatory implementation requirements.

## 8. Advanced Features

### Responsive Skeleton Loading

Automatically adapt skeleton placeholders when:

- The browser window is resized.
- The parent container changes dimensions.
- Responsive breakpoints change.
- Flexbox or grid layouts change.
- Device orientation changes.

### Dark and Light Mode

Support automatic theme detection, CSS variables, system theme preferences, and manually configured themes.

Ensure compatibility with Tailwind CSS and shadcn/ui dark-mode implementations.

### Skeleton Measurement Caching

Implement an optional caching mechanism that stores previously measured component layouts.

Use cached layouts during subsequent loading states to improve performance and reduce unnecessary DOM measurements.

Include cache invalidation strategies for responsive breakpoints, component structure changes, and theme-related dimension changes.

Do not cache sensitive component content.

### Data Fetching Integration

Provide examples demonstrating compatibility with:

- TanStack Query
- React Suspense
- SWR
- Native Fetch API
- Axios
- React state-based loading

Example:

```tsx
const { data, isLoading } = useQuery({
  queryKey: ["employees"],
  queryFn: fetchEmployees,
});

return (
  <AutoSkeleton loading={isLoading} cacheKey="employee-table">
    <EmployeeTable data={data ?? []} />
  </AutoSkeleton>
);
```

Ensure empty tables can generate meaningful skeleton rows through configurable placeholder data, row counts, or fallback layouts.

## 9. Performance Optimization

The package must be optimized for production applications, including enterprise dashboards containing hundreds of UI elements.

Implement the following:

- Efficient DOM traversal
- Batched DOM measurements
- Debounced resize and mutation observers
- Appropriate memoization
- Measurement caching
- Observer cleanup on unmount
- Prevention of unnecessary re-renders
- Prevention of memory leaks
- Minimal runtime dependencies
- Tree-shaking support
- Efficient CSS-based animations
- Prevention of layout thrashing
- Minimal Cumulative Layout Shift (CLS)

Avoid excessive DOM cloning, continuous polling, and expensive synchronous layout calculations.

Ensure compatibility with React Strict Mode.

## 10. Accessibility

Follow modern accessibility standards.

- Support `aria-busy` during loading.
- Prevent screen readers from announcing decorative skeleton elements.
- Prevent hidden content from receiving keyboard focus.
- Respect `prefers-reduced-motion`.
- Prevent interaction with unavailable content during loading.
- Avoid exposing duplicate content to assistive technologies.
- Preserve appropriate focus behavior when loading completes.

## 11. Technical Architecture

Use the following technologies:

- React
- TypeScript with strict mode
- Vite for the development playground
- tsup or an equivalent library bundler
- Vitest
- React Testing Library
- Playwright for browser-based layout testing
- ESLint
- Prettier
- pnpm

Support modern React versions, including React 18 and React 19.

Provide compatibility with:

- React SPA applications
- Next.js App Router
- Server-side rendering (SSR)
- Client-side rendering (CSR)
- Inertia.js with React

Ensure browser-specific APIs are not executed during server-side rendering and avoid hydration mismatches.

Organize the source code using a modular architecture similar to:

```text
auto-skeleton/
├── src/
│   ├── components/
│   │   ├── AutoSkeleton.tsx
│   │   ├── SkeletonProvider.tsx
│   │   └── SkeletonRenderer.tsx
│   ├── hooks/
│   │   ├── useAutoSkeleton.ts
│   │   ├── useElementMeasurement.ts
│   │   └── useSkeletonCache.ts
│   ├── core/
│   │   ├── dom-analyzer.ts
│   │   ├── layout-engine.ts
│   │   ├── shape-detector.ts
│   │   ├── skeleton-generator.ts
│   │   └── measurement-cache.ts
│   ├── utils/
│   ├── types/
│   ├── styles/
│   └── index.ts
├── examples/
├── playground/
├── tests/
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
└── LICENSE
```

Follow SOLID principles, separation of concerns, reusable architecture, and modern TypeScript best practices.

Avoid using `any` unless absolutely necessary and properly justified.

## 12. Interactive Development Playground

Create a modern interactive playground using React, TypeScript, Tailwind CSS, and shadcn/ui.

The playground should demonstrate:

- Statistics cards
- Analytics dashboards
- Employee data tables
- User profiles
- Registration forms
- Product grids
- Sidebar navigation
- Charts
- Nested components
- Responsive layouts

Include interactive controls for:

- Toggle loading state
- Simulate API loading delays
- Change animation type
- Adjust animation speed
- Change skeleton colors
- Toggle dark and light mode
- Enable and disable caching
- Change table row counts

Provide a side-by-side comparison between the original component and the automatically generated skeleton.

Use a clean, modern, professional UI.

## 13. Comprehensive README Documentation

Create a detailed, beginner-friendly, and professional `README.md` that includes:

1. Package overview and purpose.
2. Key features and benefits.
3. Installation using npm, pnpm, and yarn.
4. Quick-start guide.
5. Basic usage.
6. Global provider configuration.
7. Complete API reference.
8. Configuration properties with types and default values.
9. Custom hooks and utilities.
10. Element-level customization.
11. Dark and light mode configuration.
12. Animation customization.
13. Responsive behavior.
14. Measurement caching.
15. SSR and Next.js integration.
16. TanStack Query integration.
17. Performance recommendations.
18. Accessibility considerations.
19. Troubleshooting and frequently asked questions.
20. Known limitations.
21. Local development instructions.
22. Testing instructions.
23. Build and npm publishing instructions.

Provide complete, copy-paste-ready implementation examples for every supported component type, especially:

- Simple card
- Statistics card
- Complete dashboard
- Basic HTML table
- TanStack Table
- shadcn/ui DataTable
- Forms
- Lists
- Product grids
- User profiles
- Charts
- Navigation bars
- Sidebars
- Dialogs
- Nested components
- API-dependent components

For each example, explain how the automatic skeleton generation works without manually recreating the original component's shapes.

## 14. Testing and Quality Assurance

Create comprehensive unit, integration, and browser-based tests covering:

- Automatic shape detection
- DOM measurement accuracy
- Nested component traversal
- Loading state transitions
- Responsive layout changes
- Dark and light mode
- Measurement caching and invalidation
- Empty API data
- Initial and subsequent loading states
- Table row generation
- Element exclusion
- Observer cleanup
- React Strict Mode
- SSR compatibility
- Accessibility
- Layout shift prevention

Use browser-based visual regression tests to compare skeleton layouts against their original components.

Test realistic enterprise application scenarios, not just simple isolated components.

## 15. Package Distribution

Prepare the package for npm distribution.

Include:

- ESM and CommonJS builds
- TypeScript declaration files
- Proper package exports
- React peer dependencies
- CSS exports
- Semantic versioning
- MIT license
- Tree-shaking compatibility
- Minimal bundle size
- Production-ready build scripts
- GitHub Actions CI workflow

Use a temporary package name such as `react-auto-skeleton` and verify its availability before publishing.

Do not publish the package automatically.

## 16. Implementation Workflow

Before writing code:

1. Analyze the existing repository and its configuration.
2. Evaluate different automatic skeleton generation approaches.
3. Identify technical limitations and potential edge cases.
4. Design the package architecture and public API.
5. Create a phased implementation plan.
6. Select the most reliable and performant measurement strategy.

After planning, proceed with the actual implementation.

Do not stop at providing recommendations, pseudocode, or architectural explanations. Build the complete working package.

Run all applicable tests, type checks, lint checks, and production builds. Resolve identified errors before considering the implementation complete.

## 17. Acceptance Criteria

The implementation is considered successful when:

- Developers can generate skeleton loading using a simple wrapper component.
- Skeletons automatically resemble the original component's layout and shapes.
- Developers do not need to manually recreate skeleton structures for standard components.
- Cards, dashboards, tables, forms, and nested components are supported.
- Initial loading and subsequent loading states are handled reliably.
- Responsive layouts and dark mode work correctly.
- Loading transitions minimize layout shifts.
- The package is lightweight, reusable, accessible, and production-ready.
- All tests, type checks, and production builds pass.
- The README contains complete implementation examples.
- The package is ready for npm distribution.

Prioritize developer experience, performance, visual accuracy, maintainability, and ease of integration. The final product should feel like a modern open-source React library that can be adopted by individual developers and enterprise development teams.
