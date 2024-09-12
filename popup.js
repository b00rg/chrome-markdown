document.getElementById('download-btn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getContent" }, (response) => {
            chrome.runtime.sendMessage({
                action: "downloadMarkdown",
                content: response.content,
                filename: 'example.md'
            });
        });
    });
});
