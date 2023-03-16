import React, { useState } from 'react'
import Web3 from 'web3'
import TransactionSolABI from '../config/TransactionSolABI';

export default function Transaction() {
    const [addr, setAddr] = useState("")
    const [bal, setBal] = useState(0)
    const [ethAmount, setEthAmount] = useState(0)
    const web3 = new Web3("http://localhost:7545");
    const address = "0x5620EeA874199CeCd0714ef653dd106676123173"
    const contract = new web3.eth.Contract(TransactionSolABI, address)

    async function getAddress(){
        const address = await contract.methods.getAddress().call()
        setAddr(address)
    }
    async function getBalance(){
        const balance = await contract.methods.getBalance().call()
        setBal(balance)
    }
    async function Deposite(){
        const dep = await contract.methods.deposite().send({from:window.account, value:ethAmount*1000000000000000000})
        console.log(dep);
    }
  return (
    <div>
        <h1>Transaction</h1>
        <button onClick={getAddress}>Get Address</button>
        {
            addr && <p>Address: {addr}</p>
        }
         <button onClick={getBalance}>Get Balance</button>
        {
            bal && <p>Ballance: {bal/1000000000000000000}</p>
        }
        <div>
            <input type="number" onChange={(e)=>setEthAmount(e.target.value)} placeholder='Eth Amount'/>
            <button onClick={Deposite}>Deposite</button>
        </div>
    </div>
  )
}
