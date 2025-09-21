const fs = require('fs').promises;
const path = require('path');

exports.handler = async function(event, context) {
    const newsDir = path.join(__dirname, '../../content/news');
    const files = await fs.readdir(newsDir);
    const news = [];

    for (const file of files) {
        const content = await fs.readFile(path.join(newsDir, file), 'utf8');
        const title = file.replace('.md', '').replace(/-/g, ' ');
        news.push({ title, content });
    }

    return {
        statusCode: 200,
        body: JSON.stringify(news)
    };
};