const getIframe = (url) =>
  `<iframe src="${url}" class="embedded-codesandbox" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>`;

const getSandboxUrl = (id) => `https://codesandbox.io/s/${id}`;

module.exports = {
  getIframe,
  getSandboxUrl,
};
