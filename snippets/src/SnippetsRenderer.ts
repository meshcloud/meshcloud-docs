import { parse } from './extract';
import { Snippet } from './Snippet';

export interface SnippetSections {
  id: string;
  types: string;
  examples: string | null;
}

const standardForm = `
let Type = ...
let example = ... -- optional
in Type
`;

export class SnippetsRenderer {

  /**
   * Parses sections from a standard dhall snippet of the form
   *
   * ```dhall
   * let Type = ...
   * let example = ...
   * in Type
    * ```
   *@param id snippet id
   * @param snippet a standard dhall snippet.
   */
  public parseSections(snippet: Snippet): SnippetSections {
    const lines = parse(snippet.content);

    // the snippet indent is already normalized at this point, i.e. the first indent level starts at 0
    const exampleStartsAtIndex = lines.findIndex(x => x.content.startsWith('let example'));
    const inStartsAtIndex = lines.findIndex(x => x.content.startsWith('in'));

    if (!inStartsAtIndex) {
      console.warn(`Snippet ${snippet.id} is not in expected standard form, missing "in" section`);
      console.info('Please provide snippets in standard form:\n' + standardForm);
    }

    const hasExample = exampleStartsAtIndex > 0;

    const typeEndsAtIndex = hasExample ? exampleStartsAtIndex : inStartsAtIndex;
    const types = lines.slice(0, typeEndsAtIndex)
      .map(x => x.content)
      .join('\n')
      .trimEnd();

    const examples = !hasExample
      ? null
      : lines.slice(exampleStartsAtIndex, inStartsAtIndex)
        .map(x => x.content)
        .join('\n')
        .trimEnd();

    return {
      id: snippet.id,
      types: types,
      examples: examples
    };
  }

  private renderDocusaurusCodeBlock(sections: SnippetSections): string {
    const id = sections.id;

    const fence = '```';

    const example = !sections.examples
      ? ''
      : `
<!--Example-->
${fence}haskell
${sections.examples}
${fence}`;

    // experimental - we sometimes need the option to just describe a dhall type in the documentation
    // before actually using it in a meshStack configuration model snippet. By appending "#type" to the snippet
    // id we can signal that
    const snippetExplanation = id.endsWith('#type')
      ? ``
      : `The following configuration options are available at \`${id}\`:`;

    const template = `<!--snippet:${id}-->

${snippetExplanation}
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
${fence}haskell
${sections.types}
${fence}${example}
<!--END_DOCUSAURUS_CODE_TABS-->`;

    return template;
  }

  public render(snippet: Snippet): string {
    const sections = this.parseSections(snippet);

    return this.renderDocusaurusCodeBlock(sections);
  }
}
