'use server';

import { fetchProgramsFromDB, fetchDaneProgramuFromDB, saveProgramInDB, savePomiarInDB, fetchDaneRaportuFromDB, fetchAllReportsFromDB } from './db_actions.js'

export async function fetchProgramsList() {
    try {
        const programsList = await fetchProgramsFromDB();
        return programsList;
    } catch (error) {
        console.error('Fetching program list failed', error);
        throw error;
    }
    
    
}


export async function fetchDaneProgramu(id) {
    
    try {
        const daneprogramu = await fetchDaneProgramuFromDB(id);
        return daneprogramu;
        } catch (error) {
        console.error('Fetching program data error', error);
        throw error;
    }
 
   
}

export async function saveProgram(programid, programname, programcode, date, time) {
    
    try {
        await saveProgramInDB(programid, programname, programcode, date, time);
        return {"success": true};
    } catch (error) {
        console.error('Program saving error', error);
        throw error;
    }

    
}


export async function savePomiar(progName, pomiar, date, time) {
    
    try {
        await savePomiarInDB(progName, pomiar, date, time);
        return {"success": true};
    } catch (error) {
        console.error('Measurement saving error', error);
        throw error;
    }

    
}


export async function fetchDaneRaportu(id) {
    
    try {
        const daneraportu = await fetchDaneRaportuFromDB(id);
        return daneraportu;
        } catch (error) {
        console.error("Error fetching report data ", error);
        throw error;
    }
    
    
    return daneraportu;
}

export async function fetchAllReports() {
    
    try {
       const allReports = await fetchAllReportsFromDB();
       return allReports;

    } catch (error) {
        console.error("Error fetching reports ", error);
        throw error;
    }

    

}
