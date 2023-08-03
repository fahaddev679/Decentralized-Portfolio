import './Wallet.css';
import Web3 from "web3";
import { useState } from 'react';
import ABI from "./ABI.json";

const Wallet =({saveState})=>{
      const [connected, setConnected] = useState(true);
      const isAndroid = /andriod/i.test(navigator.userAgent);
      const init = async()=>{
        try{
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({method: "eth_requestAccounts"});
            const contract = new web3.eth.Contract(ABI, "useYourContractAddress");
            saveState({web3: web3, contract:contract});
            setConnected(false);
        }catch(error){
            alert('Please install metamask');
        }
      }
      return<>
      <div className="header">
      {isAndroid  && <button className="connectBTN">
         <a href="">Switch to mobile</a>
        </button>  } 
       <button className="connectBTN" onClick={init} disabled={!connected}>{connected ? "Connect Metamask" : "Connected"}</button>
      </div>
      </>
}
export default Wallet;