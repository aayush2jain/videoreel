async function sayHello() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab && tab.url && tab.url.includes("youtube.com/watch")) {
        const queryParameters = tab.url.split("?")[1] || '';
        // Use chrome.tabs.update to redirect to the new URL
        console.log(queryParameters);
        chrome.tabs.update(tab.id, { url: `http://localhost:3000/video/${queryParameters}` });
    }
}

document.getElementById('myButton').addEventListener('click', sayHello);
