pragma solidity >= 0.5.0<0.6.0;

import "./Provable.sol";

 
contract  RandomExample is usingProvable {

      uint256 constant NUM_RANDOM_BYTES_REQUESTED = 1;//one byte number is between 0-255.
      uint256 public latestNumber;


      event LogNewProvableQuery(string description);
      event generatedRandomNumber(uint256 randomNumber);
      

      constructor() 

            public 
      {
        update();  
      }

      function __callback(bytes32 _queryID, string memory _result, bytes memory _proof) public {

            require(msg.sender == provable_cbAddress());

            uint256 randomNumber = uint256(keccak256(abi.encodePacked(_result))) % 100; //random number between 0-100
            latestNumber = randomNumber;
            emit generatedRandomNumber(randomNumber);

      }

      function update ()

      payable
      public
       {
            uint256 QUERY_EXECUTION_DELAY = 0;
            uint256 GAS_FOR_CALLBACK = 200000;
           provable_newRandomDSQuery(//function name to get random number, takes 3 parameters
                QUERY_EXECUTION_DELAY,
                NUM_RANDOM_BYTES_REQUESTED,
                GAS_FOR_CALLBACK//this function will call __callback whenever it gets the response from the oracle and needs gas to execute __callback function as well
            );  
            emit LogNewProvableQuery("Provable query was sent, standing by for answer");
      }
      






}
