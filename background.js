chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "downloadMarkdown") {
        const { content, filename } = request;
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        chrome.downloads.download({
            url: url,
            filename: filename
        });
        URL.revokeObjectURL(url);
    }
});
