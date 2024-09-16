// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getContent") {
        // Extract content from the webpage
        let content = `
# ${document.querySelector('h1') ? document.querySelector('h1').innerText : 'No Heading'}
## ${document.querySelector('h2') ? document.querySelector('h2').innerText : 'No Heading'}
### ${document.querySelector('h3') ? document.querySelector('h3').innerText : 'No Heading'}  
#### ${document.querySelector('h4') ? document.querySelector('h4').innerText : 'No Heading'}
##### ${document.querySelector('h5') ? document.querySelector('h5').innerText : 'No Heading'}
###### ${document.querySelector('h6') ? document.querySelector('h6').innerText : 'No Heading'}
${document.querySelector('p') ? document.querySelector('p').innerText : 'No Paragraph'}
> ${document.querySelector('blockquote') ? document.querySelector('blockquote').innerText : 'No Blockquote'}
``` ${document.querySelector('code') ? document.querySelector('code').innerText : 'No Code'} ```
--- ${document.querySelector('hr') ? document.querySelector('hr').innerText : 'No Horizontal Break'}
* ${document.querySelector('li') ? document.querySelector('li').innerText : 'No List'}
* ${document.querySelector('q') ? document.querySelector('q').innerText : 'No Quote'} *
~~${document.querySelector('s') ? document.querySelector('s').innerText : 'No Strikethrough'} ~~
``` ${document.querySelector('script') ? document.querySelector('script').innerText : 'No Script'} ```
** ${document.querySelector('strong') ? document.querySelector('strong').innerText : 'No Strong'} ** 
</sub> ${document.querySelector('sub') ? document.querySelector('sub').innerText : 'No Sub'} </sub> 
</sup> ${document.querySelector('sup') ? document.querySelector('sup').innerText : 'No Sup'} </sup> ;
    '   sendResponse({ content });
    }
});
