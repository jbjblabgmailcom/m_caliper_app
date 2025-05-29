'use client';
import React from 'react';

import classes from './page.module.css';

 

export default function ViewRaport({pomiarId, progId, progName, pomiarCode, pomiarDate, pomiarTime}) {

    const pomiar = JSON.parse(pomiarCode);
    console.log(pomiar);


    return (
      
        <div className="printable">     
        <div className={classes.reportcontainer}>
        <h2>Raport pomiarowy</h2>
        
        <div className={classes.reportheader}>
            <p><strong>Raport ID:</strong> {pomiarId}</p>
            <p><strong>Nazwa detalu (programu):</strong> {progName}</p>
            <p><strong>Data pomiaru:</strong> {pomiarDate}</p>
            <p><strong>Czas pomiaru:</strong> {pomiarTime}</p>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Balon</th>
                    <th>Cecha</th>
                    <th>Nominał</th>
                    <th>Rzeczywisty</th>
                    <th>Odchyłka</th>
                    <th>Górna tol.</th>
                    <th>Dolna tol.</th>
                </tr>
            </thead>
            <tbody>
                
                    {Object.entries(pomiar).map(([key, {balon, cecha, nominal, rzeczPomiar, upper, lower}]) =>(
                        <tr key={key}>
                        <td>{balon}</td>
                        <td>{cecha}</td>
                        <td>{nominal}</td>
                        
                        {cecha === "poz" ? 
                        (
                            <td className={ Number(rzeczPomiar) >= Number(lower) && Number(rzeczPomiar) <= Number(upper) ? classes.greenCell : classes.redCell }>{rzeczPomiar}</td>
                        ) : 
                        (
                            <td className={(Number(rzeczPomiar) >= Number(nominal) + Number(lower)) && (Number(rzeczPomiar) <= Number(nominal) + Number(upper)) 
                                ? classes.greenCell : classes.redCell}>{rzeczPomiar}</td>
                        ) }
                       
                        <td>{cecha === 'poz' ? (
                            Number(rzeczPomiar).toFixed(2)
                        ) : (
                            (Number(rzeczPomiar) - Number(nominal)).toFixed(2)
                        )
                        }</td>


                        <td>{upper}</td>
                        <td>{lower}</td>
                        </tr>
                    ))}
                    
                

            </tbody>
        </table>
    </div>
        </div> 
               
     
    );
}
