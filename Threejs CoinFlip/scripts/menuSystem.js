
function checkBetAmount(msg) {

    var betAmount = document.getElementById("bet_input")
    if (betAmount.value < 1 || betAmount.value === null) {
        
        betAmount.value = 1;

        let message = document.getElementById("message_output")
        message.innerHTML = msg;
        message.style.visibility = "visible";

        return false
    } else {
        let message = document.getElementById("message_output")
        message.style.visibility = "hidden";
        return true;
    }
}


function updateWinLoseMessage(msg) {

    let message = document.getElementById("message_output")
    message.innerHTML = msg;
    message.style.visibility = "visible";
}


function updateHeadsTailsButtons(HT) {

    let headbtn = document.getElementById("heads_button")
    let tailbtn = document.getElementById("tails_button")
    if (HT == 0) {
        headbtn.style.color = "Yellow"
        tailbtn.style.color = "gray"
    } else if (HT == 1) {
        headbtn.style.color = "gray"
        tailbtn.style.color = "Yellow"
    }

}

function setSuperSpin(HT, amntwon) {

    superSpin = true;
    spinResults = parseInt(HT);
    winAmount = amntwon;
}

async function updateBalanceTotal() {

    let balanceOutput = document.getElementById("balance_output");
    let chainBalance = await web3.eth.getBalance(contractAddress);
    balanceOutput.innerHTML = "Pot Total: " + web3.utils.fromWei(chainBalance, "ether") + " ETH";

}


setInterval(updateBalanceTotal, 1000)


