'use server';

import { fetchAllReports } from '@/db/db_server_side';
import ReportList from '@/components/ReportList/ReportList';

export default async function RaportyPage () {

    const allReports = await fetchAllReports();
    


    return (
       
        <ReportList list={allReports} />
        
    )
}