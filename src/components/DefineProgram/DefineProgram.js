'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import ProgramButton from '../NewProgramButton/ProgramButton';
import classes from './page.module.css';
import CustomInput from '../CustomInput/CustomInput';
import CustomSelectable from '../CustomSelectable/CustomSelectable';
import { saveProgram } from '@/db/db_server_side';
 

export default function DefineProgram({progId, progName, progCode, progDate, progTime}) {

    //const {toggleTrigger} = useLayoutContext();

    const [selectedTol, setSelectedTol] = useState('brak');
    const [codeState, setCodeState] = useState(JSON.parse(progCode));
    const [randProgName, setrandProgName] = useState("");
    const [dbResult, setdbResult] = useState({});
    
    const unset = 0;



    useEffect(()=> {
        setrandProgName("program" + Math.floor(10000 + Math.random() * 90000));
    },[]);
    

    function addNewLine() {
        setCodeState(prev => {
          
            const lastBalon = Math.max(...Object.values(codeState).map(item => Number(item.balon) || 0));
            const newEntry = {
            balon: String(lastBalon + 1),
            cecha: 'odleglosc',
            nominal: '0',
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
        if(objectSize>1) {
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
    
    const programDate = new Date().toLocaleDateString();
    const programTime = new Date().toLocaleTimeString();
    const progNameInput = document.getElementById('progNameInput');
    const programNameFromInput = progNameInput ? progNameInput.value : "";
    
    const saveResult = await saveProgram(programNameFromInput, codeState, programDate, programTime);
    setdbResult(saveResult);
      
    

    }

const handleOnChange = (index, name, value) => {
        setCodeState(prevCodeState => {
           const updatedCodeState = { ...prevCodeState };

            if (updatedCodeState[index]) {
               const updatedItem = { ...updatedCodeState[index] };
               updatedItem[name] = value;
               if(name == 'nominal') {
                const newTol = handleNominalChange(Math.abs(value));
                updatedItem['upper'] = String(newTol);
                updatedItem['lower'] = String(-newTol);
               }
                updatedCodeState[index] = updatedItem;
            } else {
                console.warn(`Attempted to update non-existent index: ${index}`);
              
            }

            return updatedCodeState;
        });
    };


            
    function handleSelect(option) {
        setSelectedTol(option);
        
    };

    function handleNominalChange(val) {
            if (selectedTol === 'brak') {
                return 0;
            }

            const tolerances = {
                'f': [
                    { max: 6, value: 0.05 },
                    { max: 30, value: 0.1 },
                    { max: 120, value: 0.15 },
                    { max: 400, value: 0.2 },
                    { max: 1000, value: 0.3 },
                    { value: 0.5 }
                ],
                'm': [
                    { max: 6, value: 0.1 },
                    { max: 30, value: 0.2 },
                    { max: 120, value: 0.3 },
                    { max: 400, value: 0.5 },
                    { max: 1000, value: 0.8 },
                    { max: 2000, value: 1.2 },
                    { value: 2 }
                ],
                'c': [
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
        <div className={classes.defineProgramWrapper}>
                <div>
                    <p>
                        Program: {progName || randProgName}, Data utworzenia: {progDate}, Czas: {progTime}
                    </p>
                    <CustomInput defaultValue={progName || randProgName} id="progNameInput" required />
                </div>
                <div>
                    <p>
                        Wybór domyślnej tabeli tolerancji:
                    </p>
              
                {["f", "m", "c"].map((option) => (
                   <ProgramButton
                   key={option}
                   onClick={() => handleSelect(option)}
                   className={selectedTol === option ? classes.selectedButton : undefined}
                   >{option}</ProgramButton>
                ))}
            </div>
            <div className={classes.gridDisplayDiv}>
                <div><label>Balon </label></div>
                <div><label>Cecha</label></div>
                <div><label>Nominał </label></div>
                <div><label>Górna tol. </label></div>
                <div><label>Dolna tol. </label></div>
                <div><label>Usuń. </label></div>

            {Object.entries(codeState).map(([], index) => {

            
                
                return(
                <React.Fragment key={index}>
                    <div key={'balon' + index}>
                        <CustomInput 
                        id={'balon' + index} 
                        name={'balon' + index}
                        className={classes.valinput}
                        defaultValue={codeState[index]?.balon || 0}
                        onChange={(event) => handleOnChange(index, 'balon', event.target.value)}
                    />
                    </div>
                    
                    <div key={'cecha' + index}>
                        <CustomSelectable 
                        id={'cecha' + index} 
                        name={'cecha' + index}
                        className={classes.valinput}
                        value={codeState[index]?.cecha || "odleglosc"}
                        onChange={(event) => handleOnChange(index, 'cecha', event.target.value)}
                    />
                    </div>

                    <div key={'nominal' + index}>
                        <CustomInput 
                        id={'nominal' + index} 
                        name={'nominal' + index}
                        className={classes.valinput}
                        defaultValue={codeState[index]?.nominal || unset}
                        onChange={(event) => handleOnChange(index, 'nominal', event.target.value)}
                    />
                    </div>
                    
                    <div key={'upper' + index}>
                    <CustomInput 
                    id={'upper' + index} 
                    name={'upper' + index}
                    className={classes.valinput}
                    value={codeState[index]?.upper || unset}
                    onChange={(event) => handleOnChange(index, 'upper', event.target.value)}
                    
                    />
                    </div>
                    
                    <div key={'lower' + index}>
                    <CustomInput 
                    id={'lower' + index} 
                    name={'lower' + index}
                    className={classes.valinput}
                    value={codeState[index]?.lower || unset}
                    onChange={(event) => handleOnChange(index, 'lower', event.target.value)}
                    
                    />
                    </div>
                    <div key={'delete' + index} id={'delete' + index}>
                    <button 
                    onClick={() => handleRemove(index)}
                    >X
                    </button>
                    </div>
                  </React.Fragment>

                
                
            );
            })}
            </div> 
            <div><ProgramButton onClick={addNewLine}>Dodaj nowy element</ProgramButton></div>

            <div>
                <ProgramButton onClick={handleSave}>Zapisz program</ProgramButton>
            </div>
            {dbResult.success && <div className="successcontainer">Pomyślnie zapisano program</div>}
            
        </div>
    );
}
