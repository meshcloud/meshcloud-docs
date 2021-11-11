
export function sanityCheck(
  markdown: string,
) {
  const snippetRegexOpening = /<!--snippet:(.*)-->/gm;
  const snippetRegexClosing = /<!--END_DOCUSAURUS_CODE_TABS-->/gm;

  let mOpen: RegExpExecArray | null = null;
  const openIdxs: number[] = [];
  const closeIdxs: number[] = [];
  const openTags: string[] = [];
  while (null != (mOpen = snippetRegexOpening.exec(markdown))) {
    openIdxs.push(mOpen.index);
    openTags.push(mOpen[1]);
  }
  while (null != (mOpen = snippetRegexClosing.exec(markdown))) {
    closeIdxs.push(mOpen.index);
  }

  for (let i = 0; i < closeIdxs.length; i++) {
    const currentCloseIdx = closeIdxs[i];
    const openedIdxBefore = openIdxs.filter(x => x < currentCloseIdx);
    if (openedIdxBefore.length > 1) {
      throw Error('ERROR: Tag \'' + openTags.shift() + '\' seems not to be closed with <!--END_DOCUSAURUS_CODE_TABS-->');
    } else {
      openIdxs.shift();
      openTags.shift();
    }
  }

  // Check if there are still opened tags.
  if (openIdxs.length > 0) {
    throw Error('ERROR: Tag \'' + openTags.shift() + '\' seems not to be closed with <!--END_DOCUSAURUS_CODE_TABS-->');
  }
}
