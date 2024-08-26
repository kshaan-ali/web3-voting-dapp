import React, { useState, useEffect } from "react";
import Web3 from "web3";

// Replace with your contract ABI and address
const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_candidateId",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_candidateId",
        type: "uint256",
      },
    ],
    name: "voteInit",
    type: "event",
  },
  {
    inputs: [],
    name: "candidateCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const contractAddress = "0xFdE694c5Ee871da6eFD64BCFE6927320E6D01284";

export function Election() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState();
  const [cc, scc] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accountss = await web3Instance.eth.getAccounts();
        setAccounts(accountss);

        const contractInstance = new web3Instance.eth.Contract(
          contractABI,
          contractAddress
        );
        setContract(contractInstance);

        const candidateCount = await contractInstance.methods
          .candidateCount()
          .call();
        console.log(candidateCount);

        scc(candidateCount);

        const candidatesList = [];
        for (let i = 1; i <= candidateCount; i++) {
          const candidate = await contractInstance.methods.candidates(i).call();
          console.log(candidate);
          candidatesList.push(candidate);
        }
        setCandidates(candidatesList);
      } else {
        console.error("Please install MetaMask!");
      }
    };

    init();
  }, []);

  const handleVote = async () => {
    if (contract && selectedCandidate) {
      try {
        console.log(accounts);
        console.log(selectedCandidate);
        await contract.methods
          .vote(selectedCandidate)
          .send({ from: accounts[0] });
        setMessage("Vote cast successfully!");
      } catch (error) {
        setMessage("Error casting vote.");
        console.error(error);
      }
    } else {
      setMessage("Please select a candidate.");
    }
  };

  return (
    <div>
      <div className="flex justify-center text-4xl font-bold bg-blue-400 p-4 text-white ">
        <div>Decentralized Voting app</div>
      </div>

      <div className="bg-slate-100 m-7 p-5 rounded-xl">
        <div>
          <h2 className="text-3xl font-medium ">Candidates: {Number(cc)}</h2>
          <div className="text-slate-500"> Account selected: {accounts[0]}</div>
        </div>

        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.id}>
              <div className="text-xl flex justify-between bg-white m-1 rounded-lg p-2 items-center ">
                {candidate.name}
                <div className="flex items-center">
                  <div> Current Votes: {Number(candidate.voteCount)}</div>

                  <button
                    className="bg-blue-500 text-white rounded-lg p-2 m-1 pl-5 pr-5"
                    onClick={function () {
                      setSelectedCandidate(Number(candidate.id));
                      handleVote();
                    }}
                  >
                    Vote
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="text-red-700 flex justify-center select-none">
          *one account can cast a single vote*
        </div>
      </div>
      {/* <div>
                <h2>Vote for a Candidate</h2>
                <select onChange={e => setSelectedCandidate(e.target.value)}>
                    <option value="">Select a candidate</option>
                    {candidates.map(candidate => (
                        <option key={candidate.id} value={candidate.id}>
                            {candidate.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleVote}>Vote</button>
            </div> */}
      {message && <div>{message}</div>}
    </div>
  );
}
