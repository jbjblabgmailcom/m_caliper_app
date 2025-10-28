'use server';

import { fetchProgramsFromDB, fetchDaneProgramuFromDB, saveProgramInDB, savePomiarInDB, fetchDaneRaportuFromDB, fetchAllReportsFromDB, fetchUserDataFromDB, deleteFromDB } from './db_actions.js'

export async function fetchProgramsList(owner_email, limiter) {
    let programsList;
    try {
        if(!limiter) {
            programsList = await fetchProgramsFromDB(owner_email);
        } else {
            programsList = await fetchProgramsFromDB(owner_email, limiter);
        }
        
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

export async function saveProgram(programid, programname, programcode, date, time, owner_email) {
    
    try {
        const id = await saveProgramInDB(programid, programname, programcode, date, time, owner_email);
        return {"success": true,
            "id": id,
        };
    } catch (error) {
        console.error('Program saving error', error);
        throw error;
    }

    
}


export async function savePomiar(progName, pomiar, date, time, owner_email) {
    
    try {
        const id = await savePomiarInDB(progName, pomiar, date, time, owner_email);
        return {"success": true,
                "id": id
        };
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

export async function fetchAllReports(owner_email) {
    
    try {
       const allReports = await fetchAllReportsFromDB(owner_email);
       return allReports;

    } catch (error) {
        console.error("Error fetching reports ", error);
        throw error;
    }

    

}


export async function fetchUserData(owner_email) {
    
    try {
       const userData = await fetchUserDataFromDB(owner_email);
       return userData;

    } catch (error) {
        console.error("Error fetching this users data ", error);
        throw error;
    }

    

}


export async function deleteAction(id, deleteFromTable) {
    
    try {
       const deletedId = await deleteFromDB(id, deleteFromTable);
       console.log("deletedId", deletedId);
       let tempId = 0;
       if (deleteFromTable === "pomiary") {
        tempId = deletedId.pomiarid;
       } else if (deleteFromTable === "programypomiarowe") {
        tempId = deletedId.programid;
       }
       return { success: true,
                id: tempId,
                }

    } catch (error) {
        console.error("Error deleting measurement report", error);
        throw error;
    }

    

}