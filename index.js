

window.addEventListener('load', () => {
    let obj = setInterval(async () => {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            clearInterval(obj)
            let contract_mine  = await window.tronWeb.contract().at(CONTRACT_MINE_ADDR);
            bigBtc = new BigBtc(window.tronWeb, contract_mine);
            bigBtc.bindInputs();
            bigBtc.index_page();
        }
    }, 10);
});