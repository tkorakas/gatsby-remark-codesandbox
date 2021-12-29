const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const path = require('path');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readile = promisify(fs.readFile);

exports.getAllFiles = async (directory) => {
  const subdirs = await readdir(directory);

  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = resolve(directory, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    }),
  );
  return files.flat();
};

exports.getFilesContent = async (paths) => {
  const sandboxFiles = await Promise.all(
    paths.map(async (path) => {
      const content = await readile(path, { encoding: 'utf-8' });
      return {
        name: path,
        content,
      };
    }),
  );

  return sandboxFiles;
};

exports.getDirectoryPath = (url, protocol) => {
  let directoryPath = url.replace(protocol, '');
  return path.join('rootDirectory', directoryPath);
};
