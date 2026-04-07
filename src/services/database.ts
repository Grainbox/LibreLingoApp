import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { schema } from "@db/schema/schema";
import {
  Course,
  Skill,
  Challenge,
  UserProgress,
  UserStats,
} from "@db/models";

let database: Database | null = null;

export async function initializeDatabase(): Promise<Database> {
  if (database) {
    return database;
  }

  const adapter = new SQLiteAdapter({
    schema,
    dbName: "librelingo",
    jsi: true,
    onSetUpError: (error) => {
      console.error("Database setup error:", error);
    },
  });

  database = new Database({
    adapter,
    modelClasses: [Course, Skill, Challenge, UserProgress, UserStats],
  });

  return database;
}

export function getDatabase(): Database {
  if (!database) {
    throw new Error(
      "Database not initialized. Call initializeDatabase() first."
    );
  }
  return database;
}

export async function resetDatabase(): Promise<void> {
  if (database) {
    await database.write(async () => {
      await database!.unsafeResetDatabase();
    });
  }
}
