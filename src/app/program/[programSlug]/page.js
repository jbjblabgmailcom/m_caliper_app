

//import classes from '../page.module.css';
import DefineProgram from '@/components/DefineProgram/DefineProgram';
import { fetchDaneProgramu } from '@/db/db_server_side.js';


export default async function ProgramDetailPage({params}) {

    const progId = await params;
    const daneprogramu = await fetchDaneProgramu(progId.programSlug);
    const currentDate =  new Date();
    

    

    return <>
        {!daneprogramu && typeof daneprogramu !== "object" ||  daneprogramu instanceof Error ? (
            <>
            <div className="errorcontainer">Ten program nie istnieje... stwórz nowy poniżej.</div>
            <DefineProgram 
            progId={null} 
            progName={null} 
            progCode={'{"0":{"balon":"1","nominal":"","upper":"","lower":""}}'}
            progDate={currentDate.toLocaleDateString()}
            progTime={currentDate.toLocaleTimeString()}
            />
            </>
            
        ) : (
            
            <DefineProgram 
            progId={daneprogramu?.programid} 
            progName={daneprogramu?.programname} 
            progCode={daneprogramu?.programcode}
            progDate={daneprogramu?.date.toLocaleDateString()}
            progTime={daneprogramu?.time}
            />
            
        )}
        
        </>;
        


}