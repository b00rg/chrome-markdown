// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getContent") {
        // Extract content from the webpage
        let content = `
# ${document.querySelector('h1') ? document.querySelector('h1').innerText : 'No Heading'}

${document.querySelector('p') ? document.querySelector('p').innerText : 'No Paragraph'}
        `;
        sendResponse({ content });
    }
});
