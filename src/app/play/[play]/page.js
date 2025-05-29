

//import classes from '../page.module.css';
import DefineProgram from '@/components/DefineProgram/DefineProgram';
import PlayProgram from '@/components/PlayProgram/PlayProgram';
import { fetchDaneProgramu } from '@/db/db_server_side.js';


export default async function Play({params}) {

    

    const progId = await params;
    const daneprogramu = await fetchDaneProgramu(progId.play);
    const nowDate = new Date();
    const currentDate = nowDate.toLocaleDateString;
    const currentTime = nowDate.toLocaleTimeString;
    

    return <>
        {!daneprogramu && typeof daneprogramu !== "object" ||  daneprogramu instanceof Error ? (
            <>
            <div className="errorcontainer">Ten program nie istnieje... stwórz nowy poniżej.</div>
            <DefineProgram 
            progId={null} 
            progName={"twoja nazwa"} 
            progCode={'{"0":{"balon":"1","nominal":"","upper":"","lower":""}}'}
            progDate={currentDate}
            progTime={currentTime}
            />
            </>
            
        ) : (
            <PlayProgram 
            progId={daneprogramu?.programid} 
            progName={daneprogramu?.programname} 
            progCode={daneprogramu?.programcode}
            progDate={daneprogramu?.date}
            progTime={daneprogramu?.time}
            />
        )}
        
        </>;
        


}