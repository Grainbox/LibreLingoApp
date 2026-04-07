# Components

Reusable UI components for LibreLingo.

## Structure

Components should be organized by feature or type:

```
components/
├── common/              # Widely-used components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── ...
├── challenge/           # Challenge-type specific components
│   ├── CardsChallenge.tsx
│   ├── ChipsChallenge.tsx
│   └── ...
└── navigation/          # Navigation-related components
    └── ...
```

## Rules

- Each component should be a separate file
- Use TypeScript with proper typing
- Props should be typed with interfaces
- Export only the component (no barrel exports except index.ts)
