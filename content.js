// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getContent") {
        // Extract content from the webpage
        const h1 = document.querySelector('h1') ? document.querySelector('h1').innerText : 'No Heading';
        const h2 = document.querySelector('h2') ? document.querySelector('h2').innerText : 'No Heading';
        const h3 = document.querySelector('h3') ? document.querySelector('h3').innerText : 'No Heading';
        const h4 = document.querySelector('h4') ? document.querySelector('h4').innerText : 'No Heading';
        const h5 = document.querySelector('h5') ? document.querySelector('h5').innerText : 'No Heading';
        const h6 = document.querySelector('h6') ? document.querySelector('h6').innerText : 'No Heading';
        
        // Collect all paragraphs
        const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.innerText).join('\n\n') || 'No Paragraph';
        
        const blockquote = document.querySelector('blockquote') ? document.querySelector('blockquote').innerText : 'No Blockquote';
        const hr = document.querySelector('hr') ? '---' : 'No Horizontal Break';
        
        // Collect all list items
        const listItems = Array.from(document.querySelectorAll('li')).map(li => `* ${li.innerText}`).join('\n') || 'No List';
        
        const quote = document.querySelector('q') ? document.querySelector('q').innerText : 'No Quote';
        const strikethrough = document.querySelector('s') ? document.querySelector('s').innerText : 'No Strikethrough';
        const script = document.querySelector('script') ? document.querySelector('script').innerText : 'No Script';
        const strong = document.querySelector('strong') ? document.querySelector('strong').innerText : 'No Strong';
        const sub = document.querySelector('sub') ? document.querySelector('sub').innerText : 'No Sub';
        const sup = document.querySelector('sup') ? document.querySelector('sup').innerText : 'No Sup';
        const pre = document.querySelector('pre') ? document.querySelector('pre').innerText : 'No Code Block';
        const code = document.querySelector('code') ? document.querySelector('code').innerText : 'No Inline Code';
        
        // For the image and video extraction
        const img = document.querySelector('img');
        const imageMarkdown = img ? `![Alt text](${img.src})` : 'No Image';

        const video = document.querySelector('video');
        const videoMarkdown = video ? `[Video](${video.src})` : 'No Video';

        // For the table extraction
        const table = document.querySelector('table');
        let markdownTable = 'No Table';
        if (table) {
            markdownTable = '';
            const rows = table.querySelectorAll('tr');
            rows.forEach((row, rowIndex) => {
                const cells = row.querySelectorAll('th, td');
                const rowContent = Array.from(cells).map(cell => cell.innerText).join(' | ');
                markdownTable += rowIndex === 0 ? `| ${rowContent} |\n| ${'- | '.repeat(cells.length)}\n` : `| ${rowContent} |\n`;
            });
        }

        let content = `
# ${h1}
## ${h2}
### ${h3}  
#### ${h4}
##### ${h5}
###### ${h6}

${paragraphs}

> ${blockquote}

${hr}

${listItems}

* ${quote} *
~~${strikethrough}~~

\`\`\`
${script}
\`\`\`

**${strong}**

<sub>${sub}</sub>
<sup>${sup}</sup>

\`\`\`
${pre}
\`\`\`

\`\`\`
${code}
\`\`\`

${imageMarkdown}
${videoMarkdown}

${markdownTable}
        `;

        sendResponse({ content });
    }
});
