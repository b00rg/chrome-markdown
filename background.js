chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getContent") {
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
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: "OFF" });
});

chrome.action.onClicked.addListener(async (tab) => {
    const extensions = 'https://developer.chrome.com/docs/extensions';
    const webstore = 'https://developer.chrome.com/docs/webstore';
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
        // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        // Next state will always be the opposite
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';
    
        // Set the action badge to the next state
        await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
        });
      }
});
