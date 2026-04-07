import { Model } from "@nozbe/watermelondb";
import { field, relation, readonly, text } from "@nozbe/watermelondb/decorators";

export class Skill extends Model {
  static table = "skills";

  @text("course_id") courseId!: string;
  @text("slug") slug!: string;
  @text("name") name!: string;
  @text("description") description?: string;
  @field("order") order!: number;
  @readonly @field("created_at") createdAt!: number;
  @readonly @field("updated_at") updatedAt!: number;

  @relation("courses", "course_id") course!: any;
}
