import { Model } from "@nozbe/watermelondb";
import { field, relation, readonly, text } from "@nozbe/watermelondb/decorators";

export class UserStats extends Model {
  static table = "user_stats";

  @text("course_id") courseId!: string;
  @field("total_xp") totalXp!: number;
  @field("skills_completed") skillsCompleted!: number;
  @field("streak_days") streakDays!: number;
  @text("last_practice_date") lastPracticeDate?: string;
  @field("total_sessions") totalSessions!: number;
  @readonly @field("created_at") createdAt!: number;
  @readonly @field("updated_at") updatedAt!: number;

  @relation("courses", "course_id") course!: any;
}
