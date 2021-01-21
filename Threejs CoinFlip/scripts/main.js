var web3 = new Web3(Web3.givenProvider); // interacts with Contract instance
var contractInstance;
var contractAddress = "0x850ea5dC791EB753C8aadeDac171748e619C5d2e"



document.addEventListener('DOMContentLoaded', function() {

    init();


    window.ethereum.enable().then(function(accounts) { 
        //metamask sends in an array of accounts

        contractInstance = new web3.eth.Contract(abi, contractAddress, {
            to: contractAddress,
            value: web3.utils.toWei("5", "ether"),
            from: accounts[0]
        });

    });

    $("#flip_button").click(function() {

        let betAmount = checkBetAmount("Please bet 1 ETH or more. ;)")

        if (betAmount) { activatePlaceBet();}

    });

    $("#balance_button").click(showBalance);
    $("#send_to_balance_button").click(sendToBalance);
    $("#tails_button").click(changeToTails);
    $("#heads_button").click(changeToHeads);
     $("#update_button").click(randomContract);

});

async function showBalance() {

    let balance = await web3.eth.getBalance(contractAddress);
    console.log(balance)

}



function sendToBalance() {
    let betAmount = document.getElementById("bet_input").value;


    var config = {value: web3.utils.toWei(betAmount, "ether")};
  
    betAmount = web3.utils.toWei(betAmount, "ether")

    contractInstance.methods.addBalance(betAmount).send(config).then(function(transactionObj) {

        console.log(transactionObj);
    })

}




function activatePlaceBet() {


    let betAmount = document.getElementById("bet_input").value;

    var transactionObj;

    var config = {value: web3.utils.toWei(betAmount, "ether")};


    contractInstance.methods.placeBet(headsortails, betAmount).send(config)
          .on("confirmation", function(confirmationNr) {
            if (confirmationNr > 12) {

               // console.log(confirmationNr);

            }

        })
        .on("receipt", async function(receipt) {

            console.log("receipt", receipt)
            let winningResults = receipt.events.resultsSent.returnValues.resultNum
            let amountWon = receipt.events.resultsSent.returnValues.amountBet
            console.log(winningResults + " winningResults", headsortails + " HT")

            setSuperSpin(winningResults, amountWon)

        })



}



 


async function  randomContract(){

     console.log("got here")
     var ranContractInstance = new web3.eth.Contract(ranABI, ranContractAddress);
     ranContractInstance.methods.update().send({
         from:"0x79d99778e7e002b750d74f17C1F9451221676B5C",value:200000}
         ).then(function(results){

         console.log(results)
     })


     let balance = await web3.eth.getBalance(ranContractAddress);
    console.log(balance)





}

var ranContractAddress = "0x2E65077A87bb80A86b419d53d07115C94ce83802"
var ranABI = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "name": "LogNewProvableQuery",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "randomNumber",
          "type": "uint256"
        }
      ],
      "name": "generatedRandomNumber",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "latestNumber",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_myid",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "_result",
          "type": "string"
        }
      ],
      "name": "__callback",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_queryID",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "_result",
          "type": "string"
        },
        {
          "internalType": "bytes",
          "name": "_proof",
          "type": "bytes"
        }
      ],
      "name": "__callback",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "update",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    }
  ]