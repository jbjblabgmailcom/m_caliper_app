'use client';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ProgramButton from '../NewProgramButton/ProgramButton';
import classes from './page.module.css';
import { savePomiar } from '@/db/db_server_side';
import DisplayBox from '../DisplayBox/DisplayBox';
import DisplayInput from '../DisplayInput/DisplayInput';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
 

export default function PlayProgram({progId, progName, progCode, progDate, progTime, owner_email}) {

    const { data: session } = useSession();
    const [liczbaLinii, setLiczbaLinii] = useState(1);
    const [dynamicClassName, setDynamicClassName] = useState([]);
    const [codeState, setCodeState] = useState(JSON.parse(progCode));
    const [rzeczyInput, setRzeczyInput] = useState([]);
    const prevRef = useRef([]);
    const [cBox, setcBox] = useState(false);
    const [dbResult, setdbResult] = useState({});
    const [multiplier, setMultiplier] = useState('2');
    const unset = 0;
    const debounceTimeout = useRef(null);
    const progDate2 = progDate.toLocaleDateString();
    const router = useRouter();
    const inputRefs = useRef([]); // store all refs here
    const tempInputRef = useRef(null);

    
                
    
                //useEffect block

                useEffect(()=> {
                if(cBox) {
                    const tempInput = tempInputRef;
                    tempInput.current.focus();
                    
                }
                },[cBox]);
    
                useEffect(()=> {
                    
                    const codeLen = Object.keys(codeState).length;
                    setLiczbaLinii(codeLen);
                    
                },[progCode, codeState]);


                useEffect(()=> {
                    
                    setDynamicClassName(Array.from({ length: liczbaLinii }, () => ({ key: classes.displayInputBlank })));
                    setRzeczyInput(Array.from({ length: liczbaLinii }, () => ({ key: "" }))); 
                    
                },[liczbaLinii]);


               useEffect(() => {
                const prev = prevRef.current;
                rzeczyInput.forEach((item, idx) => {
                //const prevItem = prev[idx];
                const currentInput = inputRefs.current[idx];
                if(currentInput) {
                    currentInput.value = rzeczyInput[idx].key;
                }
                

                });

                prevRef.current = rzeczyInput; // update reference
                }, [rzeczyInput]);


    
    function handleCheckboxChange(event) {
        setcBox(event.target.checked);
        }

    


    function findIndex(value) {
        const entries = Object.entries(codeState); 

            for (let i = 0; i < entries.length; i++) {
                    const [key, item] = entries[i];
                    const nominal = parseFloat(item.nominal);
                    const upper = parseFloat(item.upper);
                    const lower = parseFloat(item.lower);

                    let conditionMet = false;

                    if (item.cecha === 'poz') {
                        conditionMet = value >= lower && value <= nominal + (upper * Number(multiplier));
                    } else {
                        conditionMet = value >= nominal + (lower * Number(multiplier)) && value <= nominal + (upper * Number(multiplier));
                    }

                
                    if (conditionMet) {
                        const rzeczyElement = inputRefs.current[i];
                    
                        if (rzeczyElement && rzeczyElement.value === '') {
                            return i; 
                        }
                    
                    }
                }

            return -1;
        }
        
    const handleSave = async () => {

        const pomiarCode = {};
        const pomiarDate = new Date().toLocaleDateString();
        const pomiarTime = new Date().toLocaleTimeString();
        

        for (let i = 0; i <= liczbaLinii-1; i++) {
            const balon = codeState[i]?.balon;
            const cecha = codeState[i]?.cecha;
            const nominal = codeState[i]?.nominal;

            const rzeczywistyElement = inputRefs.current[i];
            const rzeczPomiar = rzeczywistyElement.value.replace(",", ".");;

            const upper = codeState[i]?.upper;
            const lower = codeState[i]?.lower;

            

            if((typeof rzeczPomiar !== 'number' && !isFinite(rzeczPomiar)) || rzeczPomiar === '') {
                rzeczywistyElement.focus();
            } else {
                pomiarCode[i] = {
                    "balon" : balon,
                    "cecha" : cecha,
                    "nominal" :  nominal,
                    "rzeczPomiar" : String(Number(rzeczPomiar).toFixed(3)),
                    "upper" : upper,
                    "lower" : lower,
    
                }
           }
            
        }
        
        if(liczbaLinii === Object.keys(pomiarCode).length) {
            const saveResult = await savePomiar(progName, JSON.stringify(pomiarCode), pomiarDate, pomiarTime, session.user.email);
            setdbResult(saveResult);    
        } else {
            setdbResult({"error": "Incorrect data in the form. The value must be a number.."});
        }

    } //endof handleSave

function handleRzeczyChange(val, index) {
        
      if(cBox) {
        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(()=>{
            let rzeczy = Number(val.replace(",", "."));
            const tempInput = tempInputRef;
            const newIndex = findIndex(rzeczy);
            if(newIndex === -1) {
                tempInput.current.value = "";
                    tempInput.current.focus();
            } else {
            
            setRzeczyInput(prevState => 
                prevState.map((rzeczyInput, i) =>
                    i === newIndex ? { ...rzeczyInput, key: rzeczy} : rzeczyInput
                              )
            );
            const {nominal, upper, lower, cecha} = codeState[newIndex] || {};
            const nom = Number(nominal);
            const upp = Number(upper);
            const low = Number(lower);
            let newClass;

                if (rzeczy === "") {
                    newClass = classes.displayInputBlank;
                } else if (cecha === "poz") {
                    newClass = (rzeczy >= low && rzeczy <= upp) ? classes.displayInputOK : classes.displayInputNotOK;
                } else {
                    newClass = (rzeczy >= nom + low && rzeczy <= nom + upp) ? classes.displayInputOK : classes.displayInputNotOK;
                }

                setDynamicClassName(prevState =>
                    prevState.map((item, i) =>
                        i === newIndex ? { ...item, key: newClass } : item
                    )
                );
                    tempInput.current.value = "";
                    tempInput.current.focus();
      
            }
            


        }, 1000);
    }
        if(!cBox) {
            clearTimeout(debounceTimeout.current);
            debounceTimeout.current = setTimeout(()=>{
                let rzeczy = "";
                if(val !== "") {
                    rzeczy = Number(val.replace(",", "."));      
                }
                
                setRzeczyInput(prev =>
                    prev.map((item, i) =>
                        i === index ? { ...item, key: rzeczy } : item
                    )
                    );
            
            const {nominal, upper, lower, cecha} = codeState[index] || {};
            const nom = Number(nominal);
            const upp = Number(upper);
            const low = Number(lower);
            
     
                let newClass;

                if (rzeczy === "") {
                    newClass = classes.displayInputBlank;
                } else if (cecha === "poz") {
                    newClass = (rzeczy >= low && rzeczy <= upp) ? classes.displayInputOK : classes.displayInputNotOK;
                } else {
                    newClass = (rzeczy >= nom + low && rzeczy <= nom + upp) ? classes.displayInputOK : classes.displayInputNotOK;
                }

                setDynamicClassName(prevState =>
                    prevState.map((item, i) =>
                        i === index ? { ...item, key: newClass } : item
                    )
                );
                const currentInput = inputRefs.current[index];
                
                const nextInput = inputRefs.current[index +1];

                if (currentInput?.value === "") {
                    currentInput.focus();
                } else if (currentInput?.value !== "" && nextInput) {
                    nextInput.focus();
                }
                
            },1000);
      
        }

    }
  


    const handleChangeMultiplier = (event) => {
          setMultiplier(event.target.value);
 
    };




    return (
        <>
        {owner_email === session.user.email ? 
            (
              <>
              <div>
                <div>
                    <p>
                       Created date: {progDate2}, Time: {progTime}
                    </p>
                    
                </div>
                
                <div className={classes.progNameBox}>
                        <DisplayBox displayData={"Program name: " + progName || undefined} id="progNameInput" required />
                </div>
                <div className={classes.cBox}>
                    <input type="checkbox"
                    className={classes.checkbox} 
                    onChange={handleCheckboxChange}
                    />
                    Smart result match. 
                    <span>
                    <select 
                    type="select"
                    name="multiplier"
                    id="multiplier"
                    value={multiplier}
                    onChange={handleChangeMultiplier}
                    >
                        <option value="1">1x tol</option>
                        <option value="2">2x tol</option>
                        <option value="3">3x tol</option>
                    </select> Matching range.</span>
                    {cBox &&
                   
                    <DisplayInput 
                    id="temp" 
                    name="temp"

                    onChange={(e) => handleRzeczyChange(e.target.value, "temp")}
                    dynstyle={classes.displayInputAuto}
                    autoComplete="off"
                    ref={tempInputRef}
                                        
                    />
                    
                    }
                  {cBox && <span className={classes.blinkingText}>AUTO</span>}
                </div>
              
            <div className={classes.gridDisplayDiv}>
                <div><label>Bal.</label></div>
                <div><label>Feature</label></div>
                <div><label>Nominal </label></div>
                <div><label>Actual</label></div>
                <div><label>Upper tol. </label></div>
                <div><label>Lower tol. </label></div>

            {
            Object.entries(codeState).map(([_, value], index) => (
                <React.Fragment key={index}>
                    <div key={'balon' + index}>
                        <DisplayBox 
                        id={'balon' + index} 
                        name={'balon' + index}
                        displayData={codeState[index]?.balon || 0}
                    />
                    </div>
                    
                    <div key={'cecha' + index}>
                        <DisplayBox 
                        id={'cecha' + index} 
                        name={'cecha' + index}
                        displayData={codeState[index]?.cecha || "distance"}
                    />
                    </div>

                    <div key={'nominal' + index}>
                    <DisplayBox 
                    id={'nominal' + index} 
                    name={'nominal' + index}
                    displayData={codeState[index]?.nominal || unset}
                    />
                    </div>

                    <div key={'rzeczy' + index}>
                    <DisplayInput 
                    id={'rzeczy' + index} 
                    name={'rzeczy' + index}
                    onChange={(e) => handleRzeczyChange(e.target.value, index)}
                    dynstyle={dynamicClassName?.[index]?.key}
                    autoComplete="off"
                    readOnly={cBox}
                    ref={(el => (inputRefs.current[index] = el))}
                    
                    />
                    
                    </div>
                    
                    <div key={'upper' + index}>
                    <DisplayBox 
                    id={'upper' + index} 
                    name={'upper' + index}
                    displayData={codeState[index]?.upper || unset}
                    
                    />
                    </div>
                    
                    <div key={'lower' + index}>
                    <DisplayBox 
                    id={'lower' + index} 
                    name={'lower' + index}
                    displayData={codeState[index]?.lower || unset}
                    />
                    </div>
                  </React.Fragment>

                
                
            ))}
            </div> 
            

            <div>
                <ProgramButton onClick={handleSave}>Save measurment</ProgramButton>
                <ProgramButton onClick={() => window.location.href = `/program/${progId}`}>Edit program</ProgramButton>
                {dbResult.success ? (
                    <><ProgramButton onClick={() => router.push(`/raporty/${dbResult.id}`)}>
                    Report id: {dbResult.id}
                    </ProgramButton>
                    <ProgramButton onClick={() => window.location.href = `/play/${progId}`}>
                    ↻Replay.
                    </ProgramButton></> ) 
                    : null}
                
            </div>
            {dbResult.success && <div className="successcontainer">Measurment result has been saved.</div>}
            {dbResult.error && <div className="errorcontainer">Saving error {dbResult.error}</div>}
            
        </div>
        <div className={classes.spacer}></div>
              </>  
            ):
            (
                <>
                <div className="errorcontainer">Access denied.</div>
                </>
            )}
            </>
        
    );
}
