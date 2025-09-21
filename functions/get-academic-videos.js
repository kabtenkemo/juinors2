const fs = require('fs').promises;
const path = require('path');

exports.handler = async function(event, context) {
    const videosDir = path.join(__dirname, '../../content/academic-videos');
    const files = await fs.readdir(videosDir);
    const videos = [];

    for (const file of files) {
        const content = await fs.readFile(path.join(videosDir, file), 'utf8');
        const title = file.replace('.md', '').replace(/-/g, ' ');
        const urlMatch = content.match(/url: (.*)/);
        const url = urlMatch ? urlMatch[1] : '';
        videos.push({ title, url });
    }

    return {
        statusCode: 200,
        body: JSON.stringify(videos)
    };
};