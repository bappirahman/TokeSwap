import {useEffect} from "react";
import Styles from './App.module.css';
import SwapCard from './SwapCard.jsx';

const App = () => {
  useEffect(() => {
    document.title = 'TokeSwap';
  }, []);
  return (
    <div className={Styles.app}>
      <p className={Styles.note}>Note: Please use Rinkeby Testnet</p>
      <nav >
        <h1 className={Styles.title}>TokeSwap</h1>
      </nav>
      <div className={Styles.swapContainer}>
        <SwapCard className={Styles.swapCard} />
      </div>
    </div>
  );
}

export default App;
