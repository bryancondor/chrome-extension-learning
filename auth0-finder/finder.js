const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    const { id, textToSearch } = request;

    let applicationFound = null;
    let counter = 0;

    const nextButtonElement = document.querySelector('.QuantumPagination-nextPageButton');
    const totalElement = document.querySelectorAll('.QuantumPagination-pageLabelText')[1];
    const total = Number(totalElement.textContent.substring(3));


    while (!applicationFound && counter < total) {
        await sleep(1000);
        console.log('[bcd] page number:', counter);

        const rowElements = [...document.querySelectorAll('.MuiTableBody-root > tr')];


        const applications = rowElements.map((rowElement) => rowElement.firstChild.querySelector('p > a').textContent.toLowerCase());
        const application = applications.find(application => application.includes(textToSearch));

        if (!application) {
            nextButtonElement.click();
        } else {
            applicationFound = application;
        }

        counter++;
    }

    console.log('[bcd] Application Found:', applicationFound || `not found application to the following text '${textToSearch}'`);

    await chrome.runtime.sendMessage({ applicationFound });
});


