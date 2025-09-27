import DefineProgram from '@/components/DefineProgram/DefineProgram';



export default async function ProgramDetailPage() {

    const currentDate = new Date();


    return <>
        <h1>Create new program.</h1>
        
        

        <DefineProgram 
                    progId={null} 
                    progName={null} 
                    progCode={'{"0":{"balon":1,"cecha":"odleglosc","nominal":0,"upper":0,"lower":0}}'}
                    progDate={currentDate.toLocaleDateString()}
                    progTime={currentDate.toLocaleTimeString()}
                    owner_email={undefined}
                    />

        

    </>;
}