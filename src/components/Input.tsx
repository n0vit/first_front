import React, {ChangeEvent, FC} from 'react';
import "../styles/Input.css"

interface  InputProps{
    name:string;

    value?:string;
    placeholder?:string;

    type?: string;

    targetName?:string;

    onChange: (event:ChangeEvent<HTMLInputElement>)=> void


}


const Input: FC<InputProps> = ({name,value,targetName,placeholder, onChange, type="text"}) => {

    return (
        <div className="input_component">
            <div className="input_component__title">{name}</div>
            <input name={targetName?? name} onWheel={ event => event.currentTarget.blur()}   type={type} value={value} placeholder={placeholder ?? name} onChange={onChange} className="input_component__input" required/>
        </div>
    );
};

export default Input;
