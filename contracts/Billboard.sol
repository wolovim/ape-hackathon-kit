// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/utils/Strings.sol";
import "@openzeppelin/access/Ownable.sol";

contract Billboard is Ownable {
    string public message;

    constructor(string memory _message, address initialOwner) Ownable(initialOwner) {
      message = _message;
    }

    event BillboardUpdated(address indexed writer, string message);

    function setMessage(string memory _message) public returns(bool) {
        message = _message;
        emit BillboardUpdated(msg.sender, _message);
        return true;
    }

    function getMessage() public view returns(string memory) {
        return message;
    }
}
