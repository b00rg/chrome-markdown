chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
if (request.action === "getContent") {
    const selectedText = window.getSelection().toString();

    if (selectedText) {
        const textarea = document.createElement('textarea');
        textarea.value = selectedText;
        document.body.appendChild(textarea);
        
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length); // For mobile compatibility

        try {
            document.execCommand('copy');
            console.log('Selected text copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy selected text to clipboard', err);
        }

        document.body.removeChild(textarea);
    } else {
        console.log('No text selected to copy.');
    }
}

});
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: "OFF" });
});

chrome.action.onClicked.addListener(async (tab) => {
    const extensions = 'https://developer.chrome.com/docs/extensions';
    const webstore = 'https://developer.chrome.com/docs/webstore';
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';
        await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
        });
      }
});
