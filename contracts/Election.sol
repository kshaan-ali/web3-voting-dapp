// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
  
  struct Candidate{
    uint id;
    string name;
    uint voteCount;
  }
    address public owner;
  mapping(uint=>Candidate) public candidates;
  uint256 public candidateCount=0;

  mapping(address => bool) public voters;

  constructor()  {
   
   owner = msg.sender;
   
   
  }
  event voteInit(uint indexed _candidateId);

  function addCandidate(string memory name) public{
    require(msg.sender==owner,"only owner can acces this");
    candidateCount= candidateCount+1;
    candidates[candidateCount]=Candidate(candidateCount,name,0);
  }
  function vote (uint _candidateId) public {
    require(voters[msg.sender]==false,"already voted");
    require(_candidateId <= candidateCount,"invalid candidate id");
    candidates[_candidateId].voteCount+=1;
    voters[msg.sender]=true;
    emit voteInit(_candidateId);

  }

  
}
