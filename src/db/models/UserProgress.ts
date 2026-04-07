import { Model } from "@nozbe/watermelondb";
import { field, relation, readonly, text } from "@nozbe/watermelondb/decorators";

export class UserProgress extends Model {
  static table = "user_progress";

  @text("skill_id") skillId!: string;
  @text("course_id") courseId!: string;
  @field("level_completed") levelCompleted?: number;
  @field("xp_earned") xpEarned!: number;
  @field("total_attempts") totalAttempts!: number;
  @field("correct_attempts") correctAttempts!: number;
  @field("last_practiced_at") lastPracticedAt?: number;
  @readonly @field("created_at") createdAt!: number;
  @readonly @field("updated_at") updatedAt!: number;

  @relation("skills", "skill_id") skill!: any;
  @relation("courses", "course_id") course!: any;

  getAccuracy(): number {
    if (this.totalAttempts === 0) return 0;
    return Math.round((this.correctAttempts / this.totalAttempts) * 100);
  }
}
