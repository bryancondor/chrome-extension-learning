console.log('popup');

const searchButton = document.querySelector('#search_button');

searchButton.onclick = function (event) {
    event.preventDefault()

    const textToSearch = document.querySelector('#application_name').value;

    chrome.tabs.query({ currentWindow: true, active: true }, async (tabs) => {
        const activeTab = tabs[0];
        const id = activeTab.id;

        await chrome.tabs.sendMessage(id, { id, textToSearch });
        searchButton.disabled = true;
    });
};

chrome.runtime.onMessage.addListener((request) => {
    const { applicationFound } = request;
    searchButton.disabled = false;

    alert(`Application '${applicationFound}' found in the current page.`);
})