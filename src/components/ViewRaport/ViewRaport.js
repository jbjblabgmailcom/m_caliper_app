'use client';
import React from 'react';

import classes from './page.module.css';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

 

export default function ViewRaport({pomiarId, progId, progName, pomiarCode, pomiarDate, pomiarTime, owner_email}) {

    const pomiar = JSON.parse(pomiarCode);
  
    const { data: session } = useSession();



    return (
        <>
        {session.user.email === owner_email ? 
         (
            <>
            <div className="printable">     
            <div className={classes.reportcontainer}>
            <h2>Raport pomiarowy</h2>
             <div className={classes.reportheader}>
            <p><strong>Raport ID:</strong> {pomiarId}</p>
            <p><strong>Nazwa detalu (programu):</strong> {progName}</p>
            <p><strong>Data pomiaru:</strong> {pomiarDate}</p>
            <p><strong>Czas pomiaru:</strong> {pomiarTime}</p>
        </div>
        
        <table className={classes.reportTable}>
              <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                </colgroup>
            <thead>
                <tr>
                    <th>Bal</th>
                    <th>Cecha</th>
                    <th>Nom</th>
                    <th>Rzecz</th>
                    <th>Odch</th>
                    <th>↑ tol</th>
                    <th>↓ tol</th>
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
        </>
         )
         : 
         (
            <>
            <div className="errorcontainer"><h2>Access denied.</h2>
            <Link href={"/raporty/"}>Go back to report list</Link>
           </div>
            </>
         )
         }
        
        </>
               
     
    );
}
