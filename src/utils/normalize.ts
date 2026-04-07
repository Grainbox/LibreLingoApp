/**
 * Answer normalization utilities
 * Matches the normalization done by the Python backend
 *
 * Implements: EX-02 (Validateur de réponses)
 */

/**
 * Normalize text for consistent comparison
 * - Strip leading/trailing whitespace
 * - Convert to lowercase
 * - Apply NFC Unicode normalization
 *
 * This ensures accented characters are treated consistently
 */
export function normalize(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFC");
}

/**
 * Check if two answers are equivalent (after normalization)
 */
export function answersMatch(userInput: string, correctAnswer: string): boolean {
  return normalize(userInput) === normalize(correctAnswer);
}

/**
 * Check if user input matches any of the accepted answers
 */
export function matchesAnyAnswer(
  userInput: string,
  acceptedAnswers: string[]
): boolean {
  const normalized = normalize(userInput);
  return acceptedAnswers.some((answer) => normalize(answer) === normalized);
}
