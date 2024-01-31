// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Message {
    string[] public messages;

    constructor(string memory initialMessage) {
        messages.push(initialMessage);
    }

    function addMessage(string memory newMessage) public {
        messages.push(newMessage);
    }

    function getMessage() public view returns (string[] memory) {
        return messages;
    }
}
