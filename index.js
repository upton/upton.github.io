const CONTRACT_ADDR = "0xa4Dbad9463BF3B107F27649f68a64740Ed1AEC3C";

class Demo{
    constructor(_web3, _account) {
        this.web3    = _web3;
        this.account = _account;
        this.contract = new this.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDR);
    }

    async index_page() {
        $("#addr").text(this.account);
        let result = await this.contract.methods.query_user(this.account).call();
        // (users[addr].exchanged,
        // users[addr].ex_date,
        // users[addr].ex_amount);
        this.exchanged = result[0];
        if(this.exchanged == true){
            $("#exchange").prop('disabled', true);
            $("#exchange_result").text("已经兑换过Token，1个地址只能兑换1次");
            $("#ex_date").text(new Date(Number(result[1] * 1000)).toLocaleString());
            $("#ex_amount").text(Number(this.web3.utils.fromWei(result[2])));
        }
    }

    exchange() {
        let amount = $("#amount").val();
        this.contract.methods.exchange().send({value: this.web3.utils.toWei(amount), from: this.account}).then((tx) => {
            $("#exchange_result").text("已经提交区块链确认，交易Hash：" + tx.transactionHash);
        });
    }

    init() {
        let that = this;
        this.index_page();
        $("#exchange").on("click", () => {
            that.exchange();
        });
    }
}

window.addEventListener("load", async () => {
    if (window.ethereum) {
        try {
            // Request account access if needed
            window.ethereum.enable().then(accounts => {
                let web3 = new Web3(window.ethereum);
                let demo = new Demo(web3, accounts[0]);
                demo.init();
            });
        } catch (error) {
            alert(error);
        }
    } else {
        alert("need dapp browser");
    }
});