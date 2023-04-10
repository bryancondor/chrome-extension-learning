const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    await sleep(3000);

    let applicationFound = null;
    let counter = 0;

    const textToSearch = 'lala';

    const nextButtonElement = document.querySelector('.QuantumPagination-nextPageButton');
    const totalElement = document.querySelectorAll('.QuantumPagination-pageLabelText')[1];
    const total = Number(totalElement.textContent.substring(3));
    

    while (!applicationFound && counter < total) {
        await sleep(1000);
        console.log('[bcd] counter:', counter);

        const rowElements = [...document.querySelectorAll('.MuiTableBody-root > tr')];


        const applications = rowElements.map((rowElement) => rowElement.firstChild.querySelector('p > a').textContent.toLowerCase());
        const application = applications.find(application => application === textToSearch);

        if (!application) {
            nextButtonElement.click();
        } else {
            applicationFound = application;
        }

        counter++;
    }

    console.log('[bcd] Application Found:', applicationFound || `not found application to the following text '${textToSearch}'`);

})();


