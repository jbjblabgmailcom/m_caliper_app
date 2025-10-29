'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import ProgramButton from '../NewProgramButton/ProgramButton';
import classes from './page.module.css';
import CustomInput from '../CustomInput/CustomInput';
import CustomSelectable from '../CustomSelectable/CustomSelectable';
import { saveProgram } from '@/db/db_server_side';
import { useSession } from 'next-auth/react';
import ExportAndDelete from '../ExportAndDelete/ExportAndDelete';

 

export default function DefineProgram({progId, progName, progCode, progDate, progTime, owner_email}) {

    

    const [selectedTol, setSelectedTol] = useState('brak');
    const [codeState, setCodeState] = useState(JSON.parse(progCode));
    const [randProgName, setrandProgName] = useState("");
    const [dbResult, setdbResult] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const { data: session } = useSession();
    
    
    const unset = 0;
    const unsetul = '';

    useEffect(()=> {
        setrandProgName("program" + Math.floor(10000 + Math.random() * 90000));
    },[]);
    
    useEffect(()=> {
           
                setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
                clearTimeout(timer);

              }, 5000);
           
      
    },[dbResult.success]);



    function addNewLine() {
        setCodeState(prev => {
          
            const lastBalon = Math.max(...Object.values(codeState).map(item => Number(item.balon) || 0));
            const newEntry = {
            balon: String(lastBalon + 1),
            feature: 'distance',
            nominal: '',
            upper: '0',
            lower: '0',
            };

            const newKey = Object.keys(codeState).length;

            return {
            ...prev,
            [newKey]: newEntry,
            };
            
        });
        }
    
    const handleRemove = (index) => {
    setCodeState(prev => {
        const objectSize = Object.keys(codeState).length;
        if(objectSize>0) {
                    const reindexed = Object.values(prev).filter((_, i) => i !== index).reduce((acc, item, i) => {
            acc[i] = item;
            return acc;
        }, {});
          return reindexed;
        } else {
            return prev;
       }

        });
       
    };

 

    const handleSave = async () => {
    setdbResult({});
    const programDate = new Date().toLocaleDateString();
    const programTime = new Date().toLocaleTimeString();
    const progNameInput = document.getElementById('progNameInput');
    const programNameFromInput = progNameInput ? progNameInput.value : "";
  
    const saveResult = await saveProgram(programNameFromInput, codeState, programDate, programTime, session.user.email);
    setdbResult(saveResult);

  
    }

const handleOnChange = (index, name, value) => {
  const isNumeric = Number.isFinite(Number(value)) || value === "-";
  const isFeature = name === "feature";

  if (!isNumeric && !isFeature) return;

  setCodeState(prev => {
    const updated = { ...prev };
    const item = updated[index];

    if (!item) {
      console.warn(`Attempted to update non-existent index: ${index}`);
      return updated;
    }

    const newItem = { ...item, [name]: value };

    if (name === "nominal") {
      if (item.feature === "pos") {
        newItem.upper = String(value);
        newItem.lower = "0";
      } else {
        const tol = handleNominalChange(Math.abs(value));
        newItem.upper = String(tol);
        newItem.lower = String(-tol);
      }
    }

    updated[index] = newItem;
    return updated;
  });
};


            
    function handleSelect(option) {
        if(selectedTol === option) {
            setSelectedTol('brak');
        } else {
            setSelectedTol(option);
        }
        
        
    };

    function handleNominalChange(val) {
            if (selectedTol === 'brak') {
                return 0;
            }

            const tolerances = {
                '2768-f': [
                    { max: 6, value: 0.05 },
                    { max: 30, value: 0.1 },
                    { max: 120, value: 0.15 },
                    { max: 400, value: 0.2 },
                    { max: 1000, value: 0.3 },
                    { value: 0.5 }
                ],
                '2768-m': [
                    { max: 6, value: 0.1 },
                    { max: 30, value: 0.2 },
                    { max: 120, value: 0.3 },
                    { max: 400, value: 0.5 },
                    { max: 1000, value: 0.8 },
                    { max: 2000, value: 1.2 },
                    { value: 2 }
                ],
                '2768-c': [
                    { max: 3, value: 0.15 },
                    { max: 6, value: 0.2 },
                    { max: 30, value: 0.5 },
                    { max: 120, value: 0.8 },
                    { max: 400, value: 1.2 },
                    { max: 1000, value: 2 },
                    { max: 2000, value: 3 },
                    { value: 4 }
                ]
            };

            const currentTolerances = tolerances[selectedTol];
            if (!currentTolerances) {
                return 0; // Or throw an error for unknown selectedTol
            }

            for (let i = 0; i < currentTolerances.length; i++) {
                const range = currentTolerances[i];
                if (val <= range.max || range.max === undefined) {
                    return range.value;
                }
            }

            return 0; // Fallback if no range matches (shouldn't be reached if ranges are comprehensive)
}

    

    return (
        <>
        {owner_email === session.user.email || owner_email === undefined ? 
        (
        <>
        <div className={classes.defineProgramWrapper}>
                <div>
                    
                    <p>
                        Program name: {progName || randProgName}, Date: {progDate}, Time: {progTime}
                    </p>
                    <CustomInput defaultValue={progName || randProgName} id="progNameInput" required />
                </div>
                <p>
                        General tolerance:
                    </p>
                <div className={classes.toleranceButtonsBlock}>
                    
              
                {["2768-f", "2768-m", "2768-c"].map((option) => (
                   <ProgramButton
                   key={option}
                   onClick={() => handleSelect(option)}
                   className={selectedTol === option ? classes.selectedButton : undefined}
                   >{option}</ProgramButton>
                ))}
            </div>
            <div className={classes.gridDisplayDiv}>
                <div><label>Bal </label></div>
                <div><label>Feature</label></div>
                <div><label>Nominal </label></div>
                <div><label>Upp.tol </label></div>
                <div><label>Low.tol </label></div>
                <div><label>Del </label></div>

            {
               
                    Object.entries(codeState).map(([_, value], index) => {

            
                
                return(
                <React.Fragment key={index}>
                    <div key={'balon' + index}>
                        <CustomInput 
                        id={'balon' + index} 
                        name={'balon' + index}
                        className={classes.valinput}
                        value={codeState[index]?.balon || 0}
                        onChange={(event) => handleOnChange(index, 'balon', event.target.value)}
                    />
                    </div>
                    
                    <div key={'feature' + index}>
                        <CustomSelectable 
                        id={'feature' + index} 
                        name={'feature' + index}
                        className={classes.valinput}
                        value={codeState[index]?.feature || "distance"}
                        onChange={(event) => handleOnChange(index, 'feature', event.target.value)}
                    />
                    </div>

                    <div key={'nominal' + index}>
                        <CustomInput 
                        id={'nominal' + index} 
                        name={'nominal' + index}
                        className={classes.valinput}
                        value={codeState[index]?.nominal || ""}
                        onChange={(event) => handleOnChange(index, 'nominal', event.target.value)}
                        autoComplete="off"
                    />
                    </div>
                    
                    <div key={'upper' + index}>
                    <CustomInput 
                    id={'upper' + index} 
                    name={'upper' + index}
                    className={classes.valinput}
                    value={codeState[index]?.upper || unsetul}
                    onChange={(event) => handleOnChange(index, 'upper', event.target.value)}
                    
                    />
                    </div>
                    
                    <div key={'lower' + index}>
                    <CustomInput 
                    id={'lower' + index} 
                    name={'lower' + index}
                    className={classes.valinput}
                    value={codeState[index]?.lower || unsetul}
                    onChange={(event) => handleOnChange(index, 'lower', event.target.value)}
                    
                    />
                    </div>
                    
                    <div key={'delete' + index} id={'delete' + index}>
                    <button 
                    disabled={index === 0}
                    onClick={() => handleRemove(index)}
                    >X
                    </button>
                    </div>
                  </React.Fragment>

                
                
            );
            })
          
            }

            </div> 
            <div><ProgramButton onClick={addNewLine}>Add new line</ProgramButton></div>

            <div>
                <ProgramButton onClick={handleSave}>Save program</ProgramButton>
                {dbResult.success && <ProgramButton onClick={() => window.location.href = `/play/${dbResult.id}`}>Measure now</ProgramButton>} 
            </div>
            {showSuccess && dbResult.success && <div className="successcontainer">Program saved succesfully.</div>}
            
        </div>
        </>) : (
            <>
        <div className="errorcontainer"><h2>Access denied</h2></div>
        </>)

        }
        <div className={classes.exportanddeletewrapper}>
            {progId != undefined && <ExportAndDelete id={progId} redirTo="/" deleteFromTable={"programypomiarowe"} deleteMessage="Delete this program"/>} 
            
        </div>
        
        </>
        
    );
}
