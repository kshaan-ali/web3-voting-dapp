import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

// Replace with your contract ABI and address
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_candidateId","type":"uint256"}],"name":"voteInit","type":"event"},{"inputs":[],"name":"candidateCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidates","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_candidateId","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"voters","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];
const contractAddress = '0x47e44070fc38Da80E1A2289d654cBe8dA819e9D0';




export function Election(){

    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState();
    const [cc, scc] = useState();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                const accounts = await web3Instance.eth.getAccounts();
                setAccounts(accounts);

                const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
                setContract(contractInstance);

                const candidateCount = await contractInstance.methods.candidateCount().call();
                console.log(candidateCount);


                scc(candidateCount)
                
                const candidatesList = [];
                for (let i = 1; i <= candidateCount; i++) {
                    const candidate = await contractInstance.methods.candidates(i).call();
                    console.log(candidate);
                    candidatesList.push(candidate);
                }
                setCandidates(candidatesList);
            } else {
                console.error('Please install MetaMask!');
            }
        };

        init();
    }, []);

    const handleVote = async () => {
        if (contract && selectedCandidate) {
            try {
                console.log(accounts[0])
                await contract.methods.vote(1).send({ from: accounts[0] });
                setMessage('Vote cast successfully!');
            } catch (error) {
                setMessage('Error casting vote.');
                console.error(error);
            }
        } else {
            setMessage('Please select a candidate.');
        }
    };

    return (
        <div>
            <h1>Election Voting</h1>
            <div>
                <h2>Candidates</h2>
                <ul>
                    {candidates.map(candidate => (
                        <li key={candidate.id}>
                            {candidate.name}{cc} - Votes: {Number(candidate.voteCount)}{candidate.voteCount} {candidate.id}{candidate.name} 
                            <button onClick={function(){
                                setSelectedCandidate(Number(candidate.id));
                                handleVote()

                            }}>Vote</button>
                        </li>
                    ))}
                </ul>
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
};

