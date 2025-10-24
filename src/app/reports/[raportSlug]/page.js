

import { fetchDaneRaportu } from '@/db/db_server_side.js';
import ViewRaport from '@/components/ViewRaport/ViewRaport';
import Link from 'next/link';


export default async function ReportSrv({params}) {

    const raportId = await params;
    const daneraportu = await fetchDaneRaportu(raportId.raportSlug);
   
    

    return <>
        {!daneraportu && typeof daneraportu !== "object" ||  daneraportu instanceof Error ? (
            <>
            <div className="errorcontainer"><h2>Access denied.</h2>
            <Link href={"/reports/"}>Go back to report list</Link>
           </div>
            </>
        ) : (
            <ViewRaport 
            pomiarId={daneraportu?.pomiarid} 
            progId={daneraportu?.programid}
            progName={daneraportu?.programname} 
            pomiarCode={daneraportu?.pomiar}
            pomiarDate={daneraportu?.date.toISOString()}
            pomiarTime={daneraportu?.time}
            owner_email={daneraportu?.owner_email}
            />
        )}
        
        </>;
        


}