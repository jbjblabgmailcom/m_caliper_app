'use client';

import classes from './page.module.css';
import {useState} from 'react';
import Link from 'next/link';
import reportbutton from '../../../public/report.png';

import Image from 'next/image';

export default function ReportList({list}) {

    const [initReportList, setInitProgList] = useState(list);
    const [searchTerm, setSearchTerm] = useState('');

  


    const handleChange = (e) => {
        setSearchTerm(e.target.value);

    }

    const filteredList = Object.values(initReportList).filter(report => report.programname.includes(searchTerm));




    return (
        <div className={classes.wrapper}>
        
        <div className={classes.searchcontainer}>
        <input type="text" className={classes.searchinput} placeholder="Szukaj raportu wg. nazwy programu..." onChange={handleChange} />
        <div className={classes.reportcontainer}>
        <table>
            <thead>
                <tr>
                    <th>Raport ID</th>
                    <th>Nazwa programu</th>
                    <th>Data</th>
                    <th>Czas</th>
                    <th>Podgląd</th>
                    
                </tr>
            </thead>
            <tbody>
                
                    {Object.entries(filteredList).map(([key, {pomiarid, programname, date, time}]) =>(
                        <tr key={key} className={classes.rowhover}>
                        <td><Link href={`/raporty/${pomiarid}`}>{pomiarid}</Link></td>
                        <td><Link href={`/raporty/${pomiarid}`}>{programname}</Link></td>
                        <td><Link href={`/raporty/${pomiarid}`}>{date.toLocaleDateString()}</Link></td>
                        <td><Link href={`/raporty/${pomiarid}`}>{time}</Link></td>
                        <td><Link href={`/raporty/${pomiarid}`}><Image src={reportbutton} alt="raport button" width="35" /></Link></td>
                        </tr>
                    ))}
                    
                

            </tbody>
        </table>

       

        </div>
        </div>
        </div>
    );
}