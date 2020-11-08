

var web3 = new Web3(Web3.givenProvider); // interacts with Contract instance
var contractInstance;
var contractAddress = "0x7c83153490CD40A261dC04D6Ef72373c1dfe3293"



document.addEventListener('DOMContentLoaded', function() {



    window.ethereum.enable().then(function(accounts) { 
        //metamask sends in an array of accounts
        
        contractInstance = new web3.eth.Contract(abi, contractAddress,{from: accounts[0]});

        console.log(contractInstance)




    });


   

});


async function updateNewNumber(){

 var config = {
        value: web3.utils.toWei(".08", "ether")
    }

   
    contractInstance.methods.update().send(config)

    .on("transactionHash", function(hash){
        console.log(hash);
    })

    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
    })

    .on("receipt", function(receipt){
        console.log(receipt);
    })



      console.log(await contractInstance.methods.latestNumber().call())
   
  

}

async function logit(){

 console.log(await contractInstance.methods.latestNumber().call())

}









