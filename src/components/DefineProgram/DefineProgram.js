'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import ProgramButton from '../NewProgramButton/ProgramButton';
import classes from './page.module.css';
import CustomInput from '../CustomInput/CustomInput';
import CustomSelectable from '../CustomSelectable/CustomSelectable';
import { saveProgram } from '@/db/db_server_side';
import { useLayoutContext } from '@/context/LayoutContext';
 

export default function DefineProgram({progId, progName, progCode, progDate, progTime}) {

    const {toggleTrigger} = useLayoutContext();

    const [selectedTol, setSelectedTol] = useState('brak');
    const [liczbaLinii, setLiczbaLinii] = useState(1);
    const [codeState, setCodeState] = useState({});
    const [randProgName, setrandProgName] = useState("");
    const [dbResult, setdbResult] = useState({});
    const code = JSON.parse(progCode);
    const unset = 0;

    useEffect(()=> {
        setrandProgName("program" + Math.floor(10000 + Math.random() * 90000));
    },[]);
    
    useEffect(()=> {
        
        const codeLen = Object.keys(code).length;
        setLiczbaLinii(codeLen);
        
        
    },[progCode]);

    useEffect(()=> {
        setCodeState(code);
 
    },[]);
    
    const handleSave = async () => {

        const programCode = {};
        const programDate = new Date().toLocaleDateString();
        const programTime = new Date().toLocaleTimeString();
        let programNameFromInput = document.getElementById('progNameInput').value;

        for (let i = 0; i <= liczbaLinii-1; i++) {
            
            let balon = document.getElementById('balon' + i).value;
            let cecha = document.getElementById('cecha' + i).value;
            let nominal = document.getElementById('nominal' + i).value;
            let upper = document.getElementById('upper' + i).value;
            let lower = document.getElementById('lower' + i).value;

            programCode[i] = {
                "balon" : balon,
                "cecha" : cecha,
                "nominal" : nominal,
                "upper" : upper,
                "lower" : lower,
            }
        }

        
        const saveResult = await saveProgram(programNameFromInput, JSON.stringify(programCode), programDate, programTime);
        setdbResult(saveResult);
        toggleTrigger();
    

    }

    function handleIncLiczbaLinii() {
        setLiczbaLinii(prevState => prevState + 1);
        
    }
    
    function handleSelect(option) {
        setSelectedTol(option);
        
    };

    function handleNominalChange(e, index) {
        const val = e.target.value;
        if(selectedTol === 'brak') {
            document.getElementById('upper' + index).value = '';
            document.getElementById('lower' + index).value = '';
        } else if (selectedTol === 'f') {
            if(val >= 0.5 && val <= 6) {
                document.getElementById('upper' + index).value = 0.05;
                document.getElementById('lower' + index).value = -0.05;
            } else if (val > 6 && val <= 30) {
                document.getElementById('upper' + index).value = 0.1;
                document.getElementById('lower' + index).value = -0.1;
            } else if (val > 30 && val <= 120) {
                document.getElementById('upper' + index).value = 0.15;
                document.getElementById('lower' + index).value = -0.15;
            } else if (val > 120 && val <= 400) {
                document.getElementById('upper' + index).value = 0.2;
                document.getElementById('lower' + index).value = -0.2;
            } else if (val > 400 && val <= 1000) {
                document.getElementById('upper' + index).value = 0.3;
                document.getElementById('lower' + index).value = -0.3;
            } else if (val > 1000) {
                document.getElementById('upper' + index).value = 0.5;
                document.getElementById('lower' + index).value = -0.5;
            }
        } else if(selectedTol === 'm') {
            if(val >= 0.5 && val <= 6) {
                document.getElementById('upper' + index).value = 0.1;
                document.getElementById('lower' + index).value = -0.1;
            } else if (val > 6 && val <= 30) {
                document.getElementById('upper' + index).value = 0.2;
                document.getElementById('lower' + index).value = -0.2;
            } else if (val > 30 && val <= 120) {
                document.getElementById('upper' + index).value = 0.3;
                document.getElementById('lower' + index).value = -0.3;
            } else if (val > 120 && val <= 400) {
                document.getElementById('upper' + index).value = 0.5;
                document.getElementById('lower' + index).value = -0.5;
            } else if (val > 400 && val <= 1000) {
                document.getElementById('upper' + index).value = 0.8;
                document.getElementById('lower' + index).value = -0.8;
            } else if (val > 1000 && val <= 2000) {
                document.getElementById('upper' + index).value = 1.2;
                document.getElementById('lower' + index).value = -1.2;
            } else if (val > 2000) {
                document.getElementById('upper' + index).value = 2;
                document.getElementById('lower' + index).value = -2;
            }
        } else if(selectedTol === 'c') {
            if(val >= 0.5 && val <= 3) {
                document.getElementById('upper' + index).value = 0.15;
                document.getElementById('lower' + index).value = -0.15;
            } else if (val > 3 && val <= 6) {
                document.getElementById('upper' + index).value = 0.2;
                document.getElementById('lower' + index).value = -0.2;
            } else if (val > 6 && val <= 30) {
                document.getElementById('upper' + index).value = 0.5;
                document.getElementById('lower' + index).value = -0.5;
            } else if (val > 30 && val <= 120) {
                document.getElementById('upper' + index).value = 0.8;
                document.getElementById('lower' + index).value = -0.8;
            } else if (val > 120 && val <= 400) {
                document.getElementById('upper' + index).value = 1.2;
                document.getElementById('lower' + index).value = -1.2;
            } else if (val > 400 && val <= 1000) {
                document.getElementById('upper' + index).value = 2;
                document.getElementById('lower' + index).value = -2;
            } else if (val > 1000 && val <= 2000) {
                document.getElementById('upper' + index).value = 3;
                document.getElementById('lower' + index).value = -3;
            } else if (val > 2000) {
                document.getElementById('upper' + index).value = 4;
                document.getElementById('lower' + index).value = -4;
            }
        }
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

            {Array.from({length: liczbaLinii}).map((_, index)=> (
                <React.Fragment key={index}>
                    <div key={'balon' + index}>
                        <CustomInput 
                        id={'balon' + index} 
                        name={'balon' + index}
                        className={classes.valinput}
                        defaultValue={code[index]?.balon || index + 1}
                    />
                    </div>
                    
                    <div key={'cecha' + index}>
                        <CustomSelectable 
                        id={'cecha' + index} 
                        name={'cecha' + index}
                        className={classes.valinput}
                        defaultValue={code[index]?.cecha || "odleglosc"}
                    />
                    </div>

                    <div key={'nominal' + index}>
                    <CustomInput 
                    id={'nominal' + index} 
                    name={'nominal' + index}
                    className={classes.valinput}
                    defaultValue={code[index]?.nominal || unset}
                    onChange={(e) => handleNominalChange(e, index)}
                    />
                    </div>
                    
                    <div key={'upper' + index}>
                    <CustomInput 
                    id={'upper' + index} 
                    name={'upper' + index}
                    className={classes.valinput}
                    defaultValue={code[index]?.upper || unset}
                    
                    />
                    </div>
                    
                    <div key={'lower' + index}>
                    <CustomInput 
                    id={'lower' + index} 
                    name={'lower' + index}
                    className={classes.valinput}
                    defaultValue={code[index]?.lower || unset}
                    
                    />
                    </div>
                  </React.Fragment>

                
                
            ))}
            </div> 
            <div><ProgramButton onClick={handleIncLiczbaLinii}>Dodaj nowy element</ProgramButton></div>

            <div>
                <ProgramButton onClick={handleSave}>Zapisz program</ProgramButton>
            </div>
            {dbResult.success && <div className="successcontainer">Pomyślnie zapisano program</div>}
            
        </div>
    );
}
