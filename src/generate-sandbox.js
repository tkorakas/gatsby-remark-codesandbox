const {getFiles, getFilesContent} = require('./get-files');
const { default: axios } = require('axios');

const generateSandbox = (path) => {
    try {
        const paths = await getFiles(path);
        const files = await getFilesContent(paths);
        const requestBody = files.reduce((body, file) => {
            const [_, relativePath] = file.name.split(path + '/')
            body[relativePath] = {content: file.content}
            return body;
        }, {});
        const response = await axios.post('https://codesandbox.io/api/v1/sandboxes/define?json=1', {files: requestBody})
        return response.data.sandbox_id;
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = generateSandbox;