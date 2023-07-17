//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Getter{
    string public Message;
    string[] public Array;

    constructor(string memory M)
    {
        Message = M;
    }
    function GetMessage() public view returns(string memory){
        return Message;
    }
    function GetArray() view public returns(string[] memory) {
        return Array;
    }
    function SetMessage(string memory M) public {
        Array.push(Message);
        Message = M;
    }
}