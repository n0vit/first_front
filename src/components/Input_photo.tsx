import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import "../styles/Input.css"

interface InputFileI{
    title: string;

    targetName?: string;

    preview_style?: string;

    small_input?:string;
    input?: string;

    text: string;

    value: any;
    GetInput: (file:ChangeEvent<HTMLInputElement>)=>void;
}



const InputFile:FC<InputFileI> = ({title,input="input_photo",small_input="input_photo__small_input",preview_style="input_photo__photo" ,text,value,GetInput}) => {
    const [file, setFile] = useState<any| undefined>(undefined)
    useEffect(()=>{
        if(value){
            setFile([value]);
        }
    },[value])

    function  photo(file:any) {
        if (file !== undefined && value !==''){
           const img =  typeof  value=== "string" ? value:  URL.createObjectURL(file[0]);
                    return <div> <img  className={preview_style} src={img} alt=""/>    <label className={small_input}>
                <input type="file" accept=".jpg,.png,.jpeg"  onChange={(event) =>{setFile(event.target.files ?? undefined); GetInput(event)} }/> Choose another {text}
            </label> </div>
        } else {
            return   <label className={input}>
                <input type="file" accept=".jpg,.png,.jpeg"  onChange={(event) =>{setFile(event.target.files ?? undefined);  GetInput(event)}}/> {text}
            </label>
        }

    }

    return (
        <div className="input_component">
            <div className="input_component__title">{title}</div>
            {photo(file)}
        </div>
    );
};

export default InputFile;
