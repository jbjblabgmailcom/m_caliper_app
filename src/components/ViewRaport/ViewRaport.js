'use client';
import React from 'react';

import classes from './page.module.css';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

 

export default function ViewRaport({pomiarId, progId, progName, pomiarCode, pomiarDate, pomiarTime, owner_email}) {

    const pomiar = JSON.parse(pomiarCode);
  
    const { data: session } = useSession();
    //console.log(pomiarDate);


    return (
        <>
        {session.user.email === owner_email ? 
         (
            <>
            <div className="printable">     
            <div className={classes.reportcontainer}>
            <h2>Measurement report</h2>
             <div className={classes.reportheader}>
            <p><strong>Report Id:</strong> {pomiarId}</p>
            <p><strong>Program name:</strong> {progName}</p>
            <p><strong>Measure date:</strong> {pomiarDate.split('T')[0]}</p>
            <p><strong>Measure time:</strong> {pomiarTime}</p>
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
                    <th>Feature</th>
                    <th>Nominal</th>
                    <th>Actual</th>
                    <th>Error</th>
                    <th>↑ tol</th>
                    <th>↓ tol</th>
                </tr>
            </thead>
            <tbody>
                 
                    {Object.entries(pomiar).map(([key, {balon, feature, nominal, rzeczPomiar, upper, lower}]) =>(
                        <tr key={key}>
                        <td>{balon}</td>
                        <td>{feature}</td>
                        <td>{nominal}</td>
                        
                        {feature === "pos" ? 
                        (
                            <td className={ Number(rzeczPomiar) >= 0 && Number(rzeczPomiar) <= Number(nominal) ? classes.greenCell : classes.redCell }>{rzeczPomiar}</td>
                        ) : 
                        (
                            <td className={(Number(rzeczPomiar) >= Number(nominal) + Number(lower)) && (Number(rzeczPomiar) <= Number(nominal) + Number(upper)) 
                                ? classes.greenCell : classes.redCell}>{rzeczPomiar}</td>
                        ) }
                       
                        <td>{feature === 'pos' ? (
                            Number(rzeczPomiar).toFixed(2) - Number(nominal).toFixed(2)
                        ) : (
                            (Number(rzeczPomiar).toFixed(2) - Number(nominal)).toFixed(2)
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
