const fs = require('fs').promises;
const path = require('path');

exports.handler = async function(event, context) {
    const newsDir = path.join(__dirname, '../../content/news');
    try {
        const files = await fs.readdir(newsDir);
        const news = [];

        for (const file of files) {
            const content = await fs.readFile(path.join(newsDir, file), 'utf8');
            const titleMatch = content.match(/title: (.*)/);
            const title = titleMatch ? titleMatch[1] : file.replace('.md', '').replace(/-/g, ' ');
            const contentMatch = content.match(/---\n([\s\S]*)/);
            const body = contentMatch ? contentMatch[1] : '';
            news.push({ title, content: body });
        }

        return {
            statusCode: 200,
            body: JSON.stringify(news)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch news' })
        };
    }
};
