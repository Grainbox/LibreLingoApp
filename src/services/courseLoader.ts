/**
 * Course loader service
 * Reads JSON course files from assets and inserts them into the local database
 * Handles course versioning and updates based on hash
 *
 * Implements: BOOT-04 (Pipeline d'ingestion des cours JSON)
 */

import { Database } from "@nozbe/watermelondb";
import { Q } from "@nozbe/watermelondb";
import { getDatabase } from "@services/database";
import { Course, Skill, Challenge } from "@db/models";
import type {
  CourseData,
  SkillData,
  Challenge as ChallengeType,
} from "../types";

/**
 * Load a course JSON file and insert/update it in the database
 */
export async function loadCourseFromAsset(
  courseData: CourseData
): Promise<string> {
  const db = getDatabase();
  const slug = courseData.languageCode
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  // Begin transaction
  const courseId = await db.write(async () => {
    const coursesTable = db.get<Course>("courses");

    // Check if course already exists
    const existing = await coursesTable
      .query(Q.where("slug", Q.eq(slug)))
      .fetch();

    const now = Date.now();
    const versionHash = computeContentHash(courseData);

    let course: Course;

    if (existing.length > 0) {
      // Update existing course if hash differs
      const existingCourse = existing[0];
      if (existingCourse.versionHash !== versionHash) {
        // Delete old skills and challenges for this course
        await deleteCourseLearningData(db, existingCourse.id);

        // Update course record
        await existingCourse.update((record: any) => {
          record.versionHash = versionHash;
          record.updatedAt = now;
        });
        course = existingCourse;
      } else {
        // Course already up-to-date
        return existingCourse.id;
      }
    } else {
      // Create new course
      course = await coursesTable.create((record: any) => {
        record.slug = slug;
        record.name = courseData.languageName;
        record.sourceLanguage = "en"; // Assuming English source for now
        record.targetLanguage = courseData.languageCode;
        record.version = "1.0.0";
        record.versionHash = versionHash;
        record.createdAt = now;
        record.updatedAt = now;
      });
    }

    // Insert skills and challenges
    const skillsTable = db.get<Skill>("skills");
    const challengesTable = db.get<Challenge>("challenges");

    let skillIndex = 0;
    for (const module of courseData.modules) {
      for (const skillSummary of module.skills) {
        // Create skill record
        const skill = await skillsTable.create((record: any) => {
          record.courseId = course.id;
          record.slug = skillSummary.id;
          record.name = skillSummary.title;
          record.description = skillSummary.summary?.join("; ");
          record.order = skillIndex++;
          record.createdAt = now;
          record.updatedAt = now;
        });

        // Load skill challenges from JSON
        const skillData = await loadSkillData(skillSummary.practiceHref);

        // Insert challenges
        for (const challenge of skillData.challenges) {
          await challengesTable.create((record: any) => {
            record.skillId = skill.id;
            record.courseId = course.id;
            record.type = challenge.type;
            record.priority = challenge.priority;
            record.challengeData = JSON.stringify(challenge);
            record.createdAt = now;
            record.updatedAt = now;
          });
        }
      }
    }

    return course.id;
  });

  return courseId;
}

/**
 * Load skill JSON data from a path
 * In the real implementation, this would load from assets
 */
async function loadSkillData(skillPath: string): Promise<SkillData> {
  // This is a placeholder - in production, this would:
  // 1. Resolve the path relative to the course JSON location
  // 2. Load the JSON file from assets
  // 3. Parse and return it

  // For now, return empty challenges to avoid blocking
  return {
    id: "placeholder",
    levels: 0,
    challenges: [],
  };
}

/**
 * Delete all learning data (skills and challenges) for a course
 */
async function deleteCourseLearningData(
  db: Database,
  courseId: string
): Promise<void> {
  // Delete all challenges for this course
  const challenges = await db
    .get<Challenge>("challenges")
    .query(Q.where("course_id", Q.eq(courseId)))
    .fetch();

  for (const challenge of challenges) {
    await challenge.destroyPermanently();
  }

  // Delete all skills for this course
  const skills = await db
    .get<Skill>("skills")
    .query(Q.where("course_id", Q.eq(courseId)))
    .fetch();

  for (const skill of skills) {
    await skill.destroyPermanently();
  }
}

/**
 * Compute a hash of course data for versioning
 * Uses a simple hash of the essential course structure
 */
function computeContentHash(courseData: CourseData): string {
  const hashInput = JSON.stringify({
    languageName: courseData.languageName,
    modules: courseData.modules.length,
    // Add other key fields that indicate course changes
  });

  // Simple hash function (in production, use crypto)
  let hash = 0;
  for (let i = 0; i < hashInput.length; i++) {
    const char = hashInput.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * Get all available courses from the database
 */
export async function getAvailableCourses(): Promise<Course[]> {
  const db = getDatabase();
  const coursesTable = db.get<Course>("courses");
  return coursesTable.query().fetch();
}

/**
 * Get a course by slug
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const db = getDatabase();
  const coursesTable = db.get<Course>("courses");
  const results = await coursesTable
    .query(Q.where("slug", Q.eq(slug)))
    .fetch();
  return results.length > 0 ? results[0] : null;
}

/**
 * Get all skills for a course
 */
export async function getSkillsForCourse(courseId: string): Promise<Skill[]> {
  const db = getDatabase();
  const skillsTable = db.get<Skill>("skills");
  return skillsTable
    .query(Q.where("course_id", Q.eq(courseId)))
    .fetch();
}

/**
 * Get all challenges for a skill
 */
export async function getChallengesForSkill(
  skillId: string
): Promise<ChallengeType[]> {
  const db = getDatabase();
  const challengesTable = db.get<Challenge>("challenges");
  const records = await challengesTable
    .query(Q.where("skill_id", Q.eq(skillId)))
    .fetch();

  return records.map((record) => record.getChallengeObject());
}

/**
 * Initialize courses on first app launch
 * Loads embedded course files from assets
 */
export async function initializeDefaultCourses(): Promise<void> {
  const courses = await getAvailableCourses();

  // Only initialize if no courses exist
  if (courses.length > 0) {
    return;
  }

  // Try to load default courses from assets
  // This would typically be done by importing JSON files from assets/courses/
  // For now, this is a placeholder that can be extended
  try {
    // In production:
    // const spanishCourse = require("../../assets/courses/spanish.json");
    // await loadCourseFromAsset(spanishCourse);
  } catch (error) {
    console.warn("No default courses found in assets:", String(error));
  }
}

/**
 * Check if a course needs updating by comparing version hashes
 */
export async function courseNeedsUpdate(
  courseSlug: string,
  newVersionHash: string
): Promise<boolean> {
  const course = await getCourseBySlug(courseSlug);
  return !course || course.versionHash !== newVersionHash;
}
