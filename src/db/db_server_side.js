'use server';

import { fetchProgramsFromDB, fetchDaneProgramuFromDB, saveProgramInDB, savePomiarInDB, fetchDaneRaportuFromDB, fetchAllReportsFromDB } from './db_actions.js'

export async function fetchProgramsList() {
    let programsList = await fetchProgramsFromDB();
    //console.log(programsList);
    return programsList;
}


export async function fetchDaneProgramu(id) {
    let daneprogramu;
    try {
        daneprogramu = await fetchDaneProgramuFromDB(id);
        } catch (error) {
        console.log(error);
    }
    
    
    return daneprogramu;
}

export async function saveProgram(programid, programname, programcode, date, time) {
    
    try {
        await saveProgramInDB(programid, programname, programcode, date, time);
        return {"success": true};
    } catch (error) {
        console.log('Program saving error' + error);
        return {"error": error}
    }

    
}


export async function savePomiar(progName, pomiar, date, time) {
    
    try {
        await savePomiarInDB(progName, pomiar, date, time);
        return {"success": true};
    } catch (error) {
        console.log('Pomiar saving error' + error);
        return {"error": error}
    }

    
}


export async function fetchDaneRaportu(id) {
    let daneraportu;
    try {
        daneraportu = await fetchDaneRaportuFromDB(id);
        
        } catch (error) {
        console.log(error);
    }
    
    
    return daneraportu;
}

export async function fetchAllReports() {
    let allReports;
    try {
        allReports = await fetchAllReportsFromDB();

    } catch (error) {
        console.log(error);
    }

    return allReports;

}
