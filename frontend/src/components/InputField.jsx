import {useState, useEffect} from 'react';
import Styles from './InputField.module.css';

const InputField = (props) => {
  const [input, setInput] = useState(null);
  const [value, setValue] = useState(0);
  const getValue = () => {
    if(props.fieldFor === 'ETH') {
      let amount = props.amount / props.ratio;
      setValue(amount);
    }
    else if(props.fieldFor === 'DEX') {
      let amount = props.amount * props.ratio;
      setValue(amount);
    }
  }
  const onChange = (e) => {
    setInput(e.target.value);
    props.setAmount(e.target.value);
  }
  useEffect(() => {
    if (props.readOnly) {
      getValue();
    }
  },[props.amount, props.fieldFor]);
  return (
    <div className={Styles.inputField}>
      {
        props.readOnly ?
        <input type="number" name={props.fieldFor} className={Styles.input} value={value? value : ''}  readOnly='readonly' />:
        <input type="number" name={props.fieldFor} className={Styles.input} value={input} onChange={(e) => onChange(e)} />
      }
      
      <button className={Styles.inputButton}>{props.fieldFor}</button>
    </div>
  );
}

export default InputField;