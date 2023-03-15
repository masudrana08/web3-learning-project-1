import './App.css';
import React, {useEffect, useState} from 'react'
import ABI from './config/ABI';
import Web3 from 'web3';

function App() {
  const web3 = new Web3("http://localhost:7545");
  const [account, setAccount] = useState('')
  const [value, setValue] = useState('')
  
  useEffect(()=>{
    // Connect Metamask wallet
    if(window.ethereum){
      window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(accounts=>{
        setAccount(accounts[0])
      })
    }
    web3.eth.Contract.setProvider('ws://localhost:7545');
  },[])
    
  window.ethereum.on("accountsChanged", accounts=>{
    setAccount(accounts[0])
  })

  const address = "0x7a2C8446d038966c2e03aa44e8305C74fC3eF83F"
  const contract = new web3.eth.Contract(ABI, address)

  
  // Read data from Smart Contract
  const readData = async() => {
   const data = await contract.methods.get().call()
   console.log(data);
  }
  const setData = async(d) => {
   const data = await contract.methods.set(d).send({
    from: account
   })
   .on("receipt", (a)=>{
    console.log(a);
   })
  }
  return (
    <div className="App">
        {account && <p>Wallet: {account}</p> }
        <input type="text" onChange={(e)=>setValue(e.target.value)} />
        <button onClick={()=>setData(value)}>set</button> <br/>
        <button onClick={readData}>Read Data</button> 
    </div>
  );
}

export default App;
