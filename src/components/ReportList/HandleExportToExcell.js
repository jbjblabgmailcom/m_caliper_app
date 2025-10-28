import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { fetchDaneRaportu } from '@/db/db_server_side.js';


export const handleExport = async (pomiarid) => {
    console.log("cokolwiek");
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