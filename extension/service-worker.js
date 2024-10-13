// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     let tab = tabs[0];
//     if (tab && tab.url && tab.url.includes("youtube.com/watch")) {
//         const queryParameters = tab.url.split("?")[1] || '';
//         console.log(queryParameters);
//         // chrome.tabs.update(tab.id, { url: `http://localhost:3000/video/${queryParameters}` });
//     }

//     if (tab && tab.id) {
//         chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             func: () => {
//                 alert("hello from my extension");
//             }
//         });
//     } else {
//         console.error("No active tab found or invalid tab ID.");
//     }
// });
