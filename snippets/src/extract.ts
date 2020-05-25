import { takeWhile } from 'lodash';

import { Snippet } from './Snippet';

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
  /**
   * Index of the line in the source file.
   */
  index: number;
  /**
   * Indent level of the line (number of leading whitespace chars)
   */
  indent: number;
  /**
   * If this line is a snippet header, the snippet id. Otherwise null.
   */
  id: string | null;
  /**
   * line content (including indent)
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

    return {
      index: index,
      indent: indent,
      id: id && id.trim(), // trim any extra whitespace
      content: lineContent
    } as ParsedLine;
  });
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

    // check if the snippet is empty
    const firstSnippetLine = linesAfterStart[0];
    if (!firstSnippetLine) {
      console.warn(`Snippet ${start.id} appears to be empty`);
      return { id: start.id, content: '' } as Snippet;
    }

    const snippetLines = takeWhile(linesAfterStart, x =>
      // lines is empty or above indent level
      x.indent < 0 || x.indent >= firstSnippetLine.indent
    );

    const reindentedLines = snippetLines.map(x => x.content.substr(firstSnippetLine.indent)); // cut indent

    return {
      id: start.id,
      content: reindentedLines.join('\n')
    } as Snippet;
  });
}
