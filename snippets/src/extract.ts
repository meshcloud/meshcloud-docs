import { takeWhile } from 'lodash';

/**
   * find a snippet line
   * - full match is the full snippet line
   * - first capture group is the snippet id
   */
const snippetRegex = /^\s*-- snippet:(.*)/gm;

/**
 * matches the first non-whitespace character in a line
 */
const whitespaceRegex = /\S/;

/**
 * Counts leading whitespace.to determine indent level
 *
 * @returns indent level. -1 for empty lines
 */
export function indentLevel(line: string): number {
  return line.search(whitespaceRegex);
}


export interface ParsedLine {
  index: number;
  indent: number;
  id: string | null;
  /**
   * line content with indent removed
   */
  content: string;
}

/**
 * Parses all lines into intermediate form
 *
 * @param content file content as string
 */
export function parse(content: string): ParsedLine[] {
  const lines = content.split('\n');

  return lines.map((lineContent, index) => {
    const match = [...lineContent.matchAll(snippetRegex)];

    // if we have a match, id is in the first capture group
    const id = match[0] && match[0][1] || null;

    const indent = indentLevel(lineContent);

    return { index: index, indent: indent, id: id, content: lineContent.slice(indent) } as ParsedLine;
  });
}

/**
 * An extracted code snippet.
 */
export interface Snippet {
  id: string;
  content: string;
}

/**
 * Extracts code snippets from a code file.
 *
 * The algorithm employed is rather dumb:
 *   1. look for snippet indicators
 *   2. extract all following lines that have the same or higher indent level
 *   3. the snippet ends when a line with lower indentation level is detected
 */
export function snippets(content: string): Snippet[] {
  const parsed = parse(content);

  const snippetStarts = parsed.filter(x => x.id != null);

  return snippetStarts.map(start => {
    const offsetSkipSnippetIdLine = 1;
    const linesAfterStart = parsed.slice(start.index + offsetSkipSnippetIdLine);
    const snippetLines = takeWhile(linesAfterStart, x => x.indent >= start.indent);

    return {
      id: start.id,
      content: snippetLines.map(x => x.content).join('\n')
    } as Snippet;
  });
}
