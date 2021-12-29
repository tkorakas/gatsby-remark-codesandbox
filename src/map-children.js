const mapChildren = async (node, callback) => {
  const children = [];
  if (!node.children) {
    return node;
  }
  for (let child of node.children) {
    const tranformedChild = await callback(
      await mapChildren(child, callback),
    );
    children.push(tranformedChild);
  }
  return Object.assign(node, { children });
};

module.exports = mapChildren;
