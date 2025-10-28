'use client';

import classes from './page.module.css';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import reportbutton from '../../../public/report.png';
import excellbutton from '../../../public/excell.png';

import Image from 'next/image';

import { handleExport } from './HandleExportToExcell';

export default function ReportList({list}) {

    const [initReportList, setInitProgList] = useState(list);
    const [searchTerm, setSearchTerm] = useState('');

  
    useEffect(()=>{
        setInitProgList(list);
    },[list]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);

    }

    const filteredList = Object.values(initReportList).filter(report => report.programname.includes(searchTerm));


    
 


    return (
        <div className={classes.wrapper}>
        
        <div className={classes.searchcontainer}>
        <input type="text" className={classes.searchinput} placeholder="Filter reports by program name..." onChange={handleChange} />
        
        <div className={classes.reportcontainer}>
        <table>
            <thead>
                <tr>
                    <th>Report ID</th>
                    <th>Program name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>View</th>
                    <th>Export</th>
                    
                </tr>
            </thead>
            <tbody>
                
                    {Object.entries(filteredList).map(([key, {pomiarid, programname, date, time}]) =>(
                        <tr key={key} className={classes.rowhover}>
                        <td><Link href={`/reports/${pomiarid}`}>{pomiarid}</Link></td>
                        <td><Link href={`/reports/${pomiarid}`}>{programname}</Link></td>
                        <td><Link href={`/reports/${pomiarid}`}>{date.toLocaleDateString()}</Link></td>
                        <td><Link href={`/reports/${pomiarid}`}>{time}</Link></td>
                        <td><Link href={`/reports/${pomiarid}`}><Image src={reportbutton} alt="view report button" width="35" /></Link></td>
                        <td><Link href="#" onClick={() => handleExport(pomiarid)}><Image src={excellbutton} alt="view report button" width="35" /></Link></td>
                        </tr>
                    ))}
                    
                

            </tbody>
        </table>

       

        </div>
        </div>
        </div>
    );
}