const targets = ["/js/content.js"];

targets.forEach(function (js) {
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', chrome.extension.getURL(js));
    document.head.appendChild(scriptElement);
    console.log("embed");
});

console.log("test");