import { useEffect, useState } from "react";
import { Database } from "@nozbe/watermelondb";
import { initializeDatabase } from "@services/database";

export function useDatabase(): Database | null {
  const [database, setDatabase] = useState<Database | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const db = await initializeDatabase();
        if (mounted) {
          setDatabase(db);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Unknown error"));
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    throw error;
  }

  return database;
}
