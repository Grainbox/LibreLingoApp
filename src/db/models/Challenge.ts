import { Model } from "@nozbe/watermelondb";
import { field, relation, readonly, text } from "@nozbe/watermelondb/decorators";

export class Challenge extends Model {
  static table = "challenges";

  @text("skill_id") skillId!: string;
  @text("course_id") courseId!: string;
  @text("type") type!: string;
  @field("priority") priority!: number;
  @text("challenge_data") challengeData!: string;
  @readonly @field("created_at") createdAt!: number;
  @readonly @field("updated_at") updatedAt!: number;

  @relation("skills", "skill_id") skill!: any;
  @relation("courses", "course_id") course!: any;

  getChallengeObject() {
    return JSON.parse(this.challengeData);
  }
}
