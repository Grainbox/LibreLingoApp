# Services

Business logic and integration services for LibreLingo.

## Key Services

### courseLoader.ts
Loads JSON course files from assets and populates WatermelonDB on first launch.

**Implements:** BOOT-04 (Pipeline d'ingestion des cours JSON)

### answerValidator.ts
Validates user answers against correct answers with normalization.

- `normalize(text)`: Strip + lowercase + NFC Unicode
- `validateAnswer(challenge, input)`: Compare user input with accepted answers

**Implements:** EX-02 (Validateur de réponses)

### syncService.ts
Handles local-to-cloud synchronization of user progress (future).

**Implements:** AUTH-03 (Couche de synchronisation no-trust)

## Structure

Services should be organized by domain:
- `courseLoader.ts` - course data management
- `answerValidator.ts` - answer validation logic
- `syncService.ts` - cloud synchronization
- etc.
