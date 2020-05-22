import { parseSections, renderDocusaurusCodeBlock } from './render';
import { SnippetRepository } from './SnippetRepository';

const snippetRegex = /<!--snippet:(.*)-->[\s\S]+?<!--END_DOCUSAURUS_CODE_TABS-->/gm;

export async function update(markdown: string, repository: SnippetRepository): Promise<string> {

  const matches = [...markdown.matchAll(snippetRegex)];

  if (!matches.length) {
    return markdown;
  }

  // this algorithm  is not really efficient as it copies tons of strings but we don't care
  // a better implementation would probably want to use a Rope data structure
  let result = markdown;
  for (const match of matches) {

    // id is in the first capture group
    const [fullMatch, id] = match;

    if (!id) {
      throw Error(`Invalid match has no id "${match}"`);
    }

    const snippet = await repository.findSnippet(id);
    if (!snippet) {
      throw Error(`Invalid snippet reference "${id}"`); // todo: should log where we found this...
    }

    const sections = parseSections(snippet);

    const renderedSnippet = renderDocusaurusCodeBlock(id, sections);

    result = result.replace(fullMatch, renderedSnippet);
  }

  return result;
}
