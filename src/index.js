const mapChildren = require('./map-children');
const generateSandbox = require('./generate-sandbox');
const { getDirectoryPath } = require('./get-files');
const { getIframe, getSandboxUrl } = require('./utils');

const EMBED_PROTOCOL = 'codesandbox-embed://';
const LINK_PROTOCOL = 'codesandbox-link://';

module.exports = async (
  { markdownAST },
  { directory: rootDirectory },
) => {
  if (!rootDirectory) {
    throw Error('Required option "directory" not specified');
  }
  if (!rootDirectory.endsWith('/')) {
    rootDirectory += '/';
  }

  // else if (!fs.existsSync(rootDirectory)) {
  //   throw Error(`Cannot find directory "${rootDirectory}"`);
  // }

  const transformedAST = await mapChildren(
    markdownAST,
    async (node) => {
      if (node.type !== 'link') {
        return node;
      }
      if (node.url.startsWith(EMBED_PROTOCOL)) {
        const sandboxId = generateSandbox(
          getDirectoryPath(node.url, EMBED_PROTOCOL),
        );
        return {
          type: 'html',
          value: getIframe(
            `https://codesandbox.io/embed/${sandboxId}`,
          ),
        };
      }
      if (node.url.startsWith(LINK_PROTOCOL)) {
        const sandboxId = generateSandbox(
          getDirectoryPath(node.url, LINK_PROTOCOL),
        );

        return Object.assign(node, {
          url: getSandboxUrl(sandboxId),
        });
      }
      return node;
    },
  );

  return transformedAST;
};
