'use client';

import classes from './page.module.css';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import reportbutton from '../../../public/report.png';
import excellbutton from '../../../public/excell.png';

import Image from 'next/image';

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { fetchDaneRaportu } from '@/db/db_server_side.js';

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

const handleExport = async (pomiarid) => {

    const reportData = await fetchDaneRaportu(pomiarid);
    
    const pomiarData =  JSON.parse(reportData.pomiar);
    console.log(pomiarData);
    const exportHearders2 = [
     { id: 0, pomiarid: "", programname: "", date: "", time: "", email: "", empty1: "", },
     { id: 1, pomiarid: "BAL no.", programname: "Feature", date: "Nominal", time: "Actual", email: "Upper tol.", empty1: "Lower tol.", },   
    ]
    
                const exportToExcelData = Object.values(pomiarData).map((item, index) => ({
            id: index + 1,
            pomiarid: Number(item.balon),
            programname: item.feature,
            date: Number(item.nominal),
            time: Number(item.rzeczPomiar),
            email: Number(item.upper),
            empty1: Number(item.lower),
            }));

    // Create workbook & worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(reportData.programname);

    // Define headers (columns)
    worksheet.columns = [
      { header: "Report ID: " + reportData.pomiarid, key: "pomiarid", width: 20 },
      { header: "Program name: " + reportData.programname, key: "programname", width: 20 },
      { header: "Date: " + reportData.date.toLocaleDateString(), key: "date", width: 20 },
      { header: "Time: " + reportData.time, key: "time", width: 20 },
      { header: "UserEmail: " + reportData.owner_email, key: "email", width: 20 },
      { header: "", key: "empty1", width: 20 },
      { header: "", key: "empty2", width: 20 },
      
    ];

    // Add data rows
    worksheet.addRows(exportHearders2);
    worksheet.addRows(exportToExcelData);

    // Generate file in memory
    const buffer = await workbook.xlsx.writeBuffer();

    // Trigger download
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, reportData.programname + "_" + reportData.date.toLocaleDateString()+ "_" + reportData.time + ".xlsx");
  };
    
 


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