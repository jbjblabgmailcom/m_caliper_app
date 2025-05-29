

import { fetchDaneRaportu } from '@/db/db_server_side.js';
import ViewRaport from '@/components/ViewRaport/ViewRaport';
import Link from 'next/link';


export default async function Raport({params}) {

    const raportId = await params;
    const daneraportu = await fetchDaneRaportu(raportId.raportSlug);
   
    

    return <>
        {!daneraportu && typeof daneraportu !== "object" ||  daneraportu instanceof Error ? (
            <>
            <div className="errorcontainer">Raport o podanym numerze <h2>{raportId.raportSlug}</h2> Nie istnieje.</div>
            <Link href={"/raporty/"}>Wróc do listy raportów</Link>
            </>
        ) : (
            <ViewRaport 
            pomiarId={daneraportu?.pomiarid} 
            progId={daneraportu?.programid}
            progName={daneraportu?.programname} 
            pomiarCode={daneraportu?.pomiar}
            pomiarDate={daneraportu?.date.toLocaleDateString()}
            pomiarTime={daneraportu?.time}
            />
        )}
        
        </>;
        


}