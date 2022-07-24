import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import InputField from './InputField';
import Styles from './SwapCard.module.css';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { ethers } from 'ethers';
import TokeSwap from '../artifacts/contracts/TokeSwap.sol/TokeSwap.json';
import DEXToken from '../artifacts/contracts/DEXToken.sol/DEXToken.json';
import information from '../information.json';

const SwapCard = () => {
  const TokeSwapAddress = information.TokeSwapAddress;
  const DEXTokenAddress = information.DEXToken;
  // by swap From I reffer to users the selling token
  const [swapFrom, setSwapFrom] = useState('ETH');
  const [swapTo, setswapTo] = useState('DEX');
  const [amount, setAmount] = useState(null);
  const [ratio, setRatio] = useState(null);
  const [dexTokenBalance, setDexTokenBalance] = useState(0);
  const getRatio = async() => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const contract = new ethers.Contract(TokeSwapAddress,TokeSwap.abi, provider);
    const ratio = await contract.ethToDexRatio();
    setRatio(ratio.toString());
  }
  useEffect(() => {
    getBalance();
    getRatio();
  },[]);
  const changeSwap = () => {
    setSwapFrom( swapFrom === 'ETH' ? 'DEX': 'ETH');
    setswapTo( swapTo === 'DEX' ? 'ETH': 'DEX');
  }
  const swap = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(TokeSwapAddress, TokeSwap.abi, signer);
    const value = ethers.utils.parseUnits(amount.toString());
    if(swapFrom === 'ETH') {
      const tx = await contract.swapEthToDex({value: value});
      await tx.wait();
    }
    if(swapFrom === 'DEX') {
      const tx = await contract.swapDexToEth(value);
      await tx.wait();
    }
    getBalance();
  }
  const getBalance = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(DEXTokenAddress, DEXToken.abi, provider);
    let balance = await contract.balanceOf(address);
    balance = balance / 10 ** 18;
    setDexTokenBalance(balance.toString());
  }
  // Need to make the balance reload after every transaction
  return (
    <div className={Styles.card}>
      <h2 className={Styles.swapTitle}>Swap</h2>
      <InputField fieldFor={swapFrom} amount={amount} setAmount={setAmount} />
      <AiOutlineArrowDown onClick={changeSwap} />
      <InputField readOnly={true} fieldFor={swapTo} amount={amount} ratio={ratio} />
      <p>DEX Token Balance: {dexTokenBalance}</p>
      <button className={Styles.swapButton} onClick={() => swap()}>Swap</button>
    </div>
  )
}

export default SwapCard;