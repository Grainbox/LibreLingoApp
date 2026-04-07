#!/usr/bin/env node

/**
 * Ingest course JSON files into assets/courses/
 * Computes hash of course JSON for versioning
 *
 * Usage:
 *   npx ts-node scripts/ingest-course.ts <path-to-course.json> [output-dir]
 *
 * Example:
 *   npx ts-node scripts/ingest-course.ts /path/to/spanish-a1.json
 *   → copies to assets/courses/spanish-a1_<hash>.json
 */

import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

interface CourseMetadata {
  slug: string;
  version: string;
  versionHash: string;
}

/**
 * Compute SHA256 hash of a string
 */
function computeHash(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex");
}

/**
 * Validate course JSON has required structure
 */
function validateCourseStructure(data: unknown): asserts data is {
  languageName: string;
  languageCode: string;
  uiLanguage: string;
  specialCharacters: string[];
  repositoryURL: string;
  license: { name: { short: string; full: string }; link: string };
  modules: unknown[];
} {
  const obj = data as Record<string, unknown>;

  const requiredFields = [
    "languageName",
    "languageCode",
    "uiLanguage",
    "specialCharacters",
    "repositoryURL",
    "license",
    "modules",
  ];

  for (const field of requiredFields) {
    if (!(field in obj)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  if (!Array.isArray(obj.modules)) {
    throw new Error("modules must be an array");
  }
}

/**
 * Extract or generate slug from course data
 */
function getSlugFromCourse(data: unknown): string {
  const obj = data as Record<string, unknown>;
  if (typeof obj.languageCode === "string") {
    return obj.languageCode.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }
  throw new Error("Unable to generate slug from course data");
}

/**
 * Main ingestion logic
 */
async function ingestCourse(
  inputPath: string,
  outputDir: string = "assets/courses"
): Promise<CourseMetadata> {
  // Resolve to absolute paths
  const absoluteInputPath = path.resolve(inputPath);
  const absoluteOutputDir = path.resolve(outputDir);

  // Verify input file exists
  if (!fs.existsSync(absoluteInputPath)) {
    throw new Error(`Input file not found: ${absoluteInputPath}`);
  }

  // Ensure output directory exists
  if (!fs.existsSync(absoluteOutputDir)) {
    fs.mkdirSync(absoluteOutputDir, { recursive: true });
  }

  // Read and parse course JSON
  const fileContent = fs.readFileSync(absoluteInputPath, "utf-8");
  let courseData: unknown;

  try {
    courseData = JSON.parse(fileContent);
  } catch (error) {
    throw new Error(`Invalid JSON in input file: ${String(error)}`);
  }

  // Validate structure
  try {
    validateCourseStructure(courseData);
  } catch (error) {
    throw new Error(`Invalid course structure: ${String(error)}`);
  }

  // Extract slug and compute hash
  const slug = getSlugFromCourse(courseData);
  const versionHash = computeHash(fileContent).substring(0, 8); // Use first 8 chars

  // Output filename: <slug>_<hash>.json
  const outputFilename = `${slug}_${versionHash}.json`;
  const outputPath = path.join(absoluteOutputDir, outputFilename);

  // Write the course JSON to output
  fs.writeFileSync(outputPath, fileContent, "utf-8");

  console.log(`✓ Ingested course: ${slug}`);
  console.log(`  Hash: ${versionHash}`);
  console.log(`  Output: ${outputPath}`);

  return {
    slug,
    version: String((courseData as Record<string, unknown>).version || "1.0.0"),
    versionHash,
  };
}

/**
 * CLI entry point
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: npx ts-node scripts/ingest-course.ts <path-to-course.json> [output-dir]");
    process.exit(1);
  }

  const inputPath = args[0];
  const outputDir = args[1] || "assets/courses";

  try {
    const metadata = await ingestCourse(inputPath, outputDir);
    console.log("\nMetadata:", JSON.stringify(metadata, null, 2));
    process.exit(0);
  } catch (error) {
    console.error("Error ingesting course:", String(error));
    process.exit(1);
  }
}

// Run if invoked directly
if (require.main === module) {
  main();
}

export { ingestCourse, computeHash, validateCourseStructure };
