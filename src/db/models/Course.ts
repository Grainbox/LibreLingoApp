import { Model } from "@nozbe/watermelondb";
import { field, readonly, text } from "@nozbe/watermelondb/decorators";

export class Course extends Model {
  static table = "courses";

  @text("slug") slug!: string;
  @text("name") name!: string;
  @text("source_language") sourceLanguage!: string;
  @text("target_language") targetLanguage!: string;
  @text("image_url") imageUrl?: string;
  @text("description") description?: string;
  @text("version") version!: string;
  @text("version_hash") versionHash!: string;
  @readonly @field("created_at") createdAt!: number;
  @readonly @field("updated_at") updatedAt!: number;
}
