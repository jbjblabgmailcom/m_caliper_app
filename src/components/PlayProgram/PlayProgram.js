'use client';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ProgramButton from '../NewProgramButton/ProgramButton';
import classes from './page.module.css';
import { savePomiar } from '@/db/db_server_side';
import DisplayBox from '../DisplayBox/DisplayBox';
import DisplayInput from '../DisplayInput/DisplayInput';
 

export default function PlayProgram({progId, progName, progCode, progDate, progTime}) {


    const [liczbaLinii, setLiczbaLinii] = useState(1);
    const [dynamicClassName, setDynamicClassName] = useState([]);
    const [rzeczyInput, setRzeczyInput] = useState([]);

    const [dbResult, setdbResult] = useState({});
    const code = JSON.parse(progCode);
    const unset = 0;
    const debounceTimeout = useRef(null);
    const progDate2 = progDate.toLocaleDateString();

    

    
    useEffect(()=> {
        
        const codeLen = Object.keys(code).length;
        setLiczbaLinii(codeLen);
        
    },[progCode]);


    useEffect(()=> {
        
        setDynamicClassName(Array.from({ length: liczbaLinii }, () => ({ key: classes.displayInputBlank })));
        
    },[liczbaLinii]);

    useEffect(()=> {
        
        setRzeczyInput(Array.from({ length: liczbaLinii }, () => ({ key: "" }))); 
        
    },[liczbaLinii]);
    


    
    const handleSave = async () => {

        const pomiarCode = {};
        const pomiarDate = new Date().toLocaleDateString();
        const pomiarTime = new Date().toLocaleTimeString();
        

        for (let i = 0; i <= liczbaLinii-1; i++) {
            const balon = code[i]?.balon;
            const cecha = code[i]?.cecha;
            const nominal = code[i]?.nominal;

            const rzeczywistyElement = document.getElementById('rzeczy' + i);
            const rzeczPomiar = rzeczywistyElement.value;

            const upper = code[i]?.upper;
            const lower = code[i]?.lower;

            

            if((typeof rzeczPomiar !== 'number' && !isFinite(rzeczPomiar)) || rzeczPomiar === '') {
                rzeczywistyElement.focus();
            } else {
                pomiarCode[i] = {
                    "balon" : balon,
                    "cecha" : cecha,
                    "nominal" :  nominal,
                    "rzeczPomiar" : rzeczPomiar,
                    "upper" : upper,
                    "lower" : lower,
    
                }
           }
            
        }
        console.log(liczbaLinii);
        console.log(Object.keys(pomiarCode).length);
        console.log(pomiarCode);
        if(liczbaLinii === Object.keys(pomiarCode).length) {
            const saveResult = await savePomiar(progName, JSON.stringify(pomiarCode), pomiarDate, pomiarTime);
            setdbResult(saveResult);    
        } else {
            setdbResult({"error": "Błędne dane w formularzu. Wartość musi być liczbą."});
        }
        

    }

     function handleRzeczyChange(e, index) {
            setRzeczyInput(prevState => prevState.map((rzeczyInput, i) => i === index ? { ...rzeczyInput, key: e.target.value.replace(",", ".")} : rzeczyInput));

            clearTimeout(debounceTimeout.current);
            debounceTimeout.current = setTimeout(() => {
            const rzeczy = e.target.value.replace(",", ".");
            const nom = Number(code[index]?.nominal);
            const upp = Number(code[index]?.upper);
            const low = Number(code[index]?.lower);
            const cecha = code[index]?.cecha;
     
            if(rzeczy === "") {
                setDynamicClassName(prevState => prevState.map((dynamicClassName, i) => i === index ? { ...dynamicClassName, key: classes.displayInputBlank } : dynamicClassName));
            } else if(cecha === "poz") {
                if(rzeczy >= low && rzeczy <= upp) {
                    setDynamicClassName(prevState => prevState.map((dynamicClassName, i) => i === index ? { ...dynamicClassName, key: classes.displayInputOK } : dynamicClassName));
                } else {
                    setDynamicClassName(prevState => prevState.map((dynamicClassName, i) => i === index ? { ...dynamicClassName, key: classes.displayInputNotOK } : dynamicClassName));
                }    
            } else if (rzeczy >= nom + low && rzeczy <= nom + upp) {
                    setDynamicClassName(prevState => prevState.map((dynamicClassName, i) => i === index ? { ...dynamicClassName, key: classes.displayInputOK } : dynamicClassName));
                    } else {
                    setDynamicClassName(prevState => prevState.map((dynamicClassName, i) => i === index ? { ...dynamicClassName, key: classes.displayInputNotOK } : dynamicClassName));
            }
        if(document.getElementById('rzeczy' + (index+1)) !== null) {
            document.getElementById('rzeczy' + (index+1)).focus();
        } else {
            document.getElementById('rzeczy' + (index)).focus();
        }
        
        }, 1000); 
   
        
    };



    return (
        <div>
                <div>
                    <p>
                       Data utworzenia: {progDate2}, Czas: {progTime}, Program id: {progId}
                    </p>
                    
                </div>
                <div>
                    <p>
                        Nazwa programu:
                    </p>
                    
                </div>
                <div>
                        <DisplayBox displayData={progName || undefined} id="progNameInput" required />
                </div>
              
            <div className={classes.gridDisplayDiv}>
                <div><label>Balon </label></div>
                <div><label>Cecha</label></div>
                <div><label>Nominał </label></div>
                <div><label>Pomiar rzecz.</label></div>
                <div><label>Gór. tol. </label></div>
                <div><label>Dol. tol. </label></div>

            {Array.from({length: liczbaLinii}).map((_, index)=> (
                <React.Fragment key={index}>
                    <div key={'balon' + index}>
                        <DisplayBox 
                        id={'balon' + index} 
                        name={'balon' + index}
                        displayData={code[index]?.balon || index + 1}
                    />
                    </div>
                    
                    <div key={'cecha' + index}>
                        <DisplayBox 
                        id={'cecha' + index} 
                        name={'cecha' + index}
                        displayData={code[index]?.cecha || "odleglosc"}
                    />
                    </div>

                    <div key={'nominal' + index}>
                    <DisplayBox 
                    id={'nominal' + index} 
                    name={'nominal' + index}
                    displayData={code[index]?.nominal || unset}
                    />
                    </div>

                    <div key={'rzeczy' + index}>
                    <DisplayInput 
                    id={'rzeczy' + index} 
                    name={'rzeczy' + index}
                    onChange={(e) => handleRzeczyChange(e, index)}
                    dynstyle={dynamicClassName?.[index]?.key}
                    autoComplete="off"
                    value={rzeczyInput[index]?.key || ""}
                    
                    />
                    </div>
                    
                    <div key={'upper' + index}>
                    <DisplayBox 
                    id={'upper' + index} 
                    name={'upper' + index}
                    displayData={code[index]?.upper || unset}
                    
                    />
                    </div>
                    
                    <div key={'lower' + index}>
                    <DisplayBox 
                    id={'lower' + index} 
                    name={'lower' + index}
                    displayData={code[index]?.lower || unset}
                    />
                    </div>
                  </React.Fragment>

                
                
            ))}
            </div> 
            

            <div>
                <ProgramButton onClick={handleSave}>Zapisz pomiar</ProgramButton>
            </div>
            {dbResult.success && <div className="successcontainer">Pomyślnie zapisano pomiar</div>}
            {dbResult.error && <div className="errorcontainer">Błąd zapisu {dbResult.error}</div>}
            
        </div>
    );
}
