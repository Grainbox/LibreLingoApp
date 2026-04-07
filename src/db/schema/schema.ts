import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "courses",
      columns: [
        { name: "slug", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "sourceLanguage", type: "string" },
        { name: "targetLanguage", type: "string" },
        { name: "imageUrl", type: "string", isOptional: true },
        { name: "description", type: "string", isOptional: true },
        { name: "version", type: "string" },
        { name: "versionHash", type: "string" },
        { name: "createdAt", type: "number" },
        { name: "updatedAt", type: "number" },
      ],
    }),

    tableSchema({
      name: "skills",
      columns: [
        { name: "courseId", type: "string", isIndexed: true },
        { name: "slug", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "description", type: "string", isOptional: true },
        { name: "order", type: "number" },
        { name: "createdAt", type: "number" },
        { name: "updatedAt", type: "number" },
      ],
    }),

    tableSchema({
      name: "challenges",
      columns: [
        { name: "skillId", type: "string", isIndexed: true },
        { name: "courseId", type: "string", isIndexed: true },
        { name: "type", type: "string" },
        { name: "priority", type: "number" },
        { name: "challengeData", type: "string" },
        { name: "createdAt", type: "number" },
        { name: "updatedAt", type: "number" },
      ],
    }),

    tableSchema({
      name: "user_progress",
      columns: [
        { name: "skillId", type: "string", isIndexed: true },
        { name: "courseId", type: "string", isIndexed: true },
        { name: "levelCompleted", type: "number", isOptional: true },
        { name: "xpEarned", type: "number" },
        { name: "totalAttempts", type: "number" },
        { name: "correctAttempts", type: "number" },
        { name: "lastPracticedAt", type: "number", isOptional: true },
        { name: "createdAt", type: "number" },
        { name: "updatedAt", type: "number" },
      ],
    }),

    tableSchema({
      name: "user_stats",
      columns: [
        { name: "courseId", type: "string", isIndexed: true },
        { name: "totalXp", type: "number" },
        { name: "skillsCompleted", type: "number" },
        { name: "streakDays", type: "number" },
        { name: "lastPracticeDate", type: "string", isOptional: true },
        { name: "totalSessions", type: "number" },
        { name: "createdAt", type: "number" },
        { name: "updatedAt", type: "number" },
      ],
    }),
  ],
});
