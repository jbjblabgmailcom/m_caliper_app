'use client';

import { fetchAllReports } from '@/db/db_server_side';
import ReportList from '@/components/ReportList/ReportList';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';


export const dynamic = 'force-dynamic';

export default function RaportyPage () {

    const [allReports, setallReports] = useState([]);
    const { data: session } = useSession();

        useEffect(()=> {
            const updateReportList = async () => {
                try {
                   let result =  await fetchAllReports(session.user.email);
                   setallReports(result);
                } catch (error) {
                    console.error("Failed to fetch reports for this user.", error);
                }
    
            }
            updateReportList();
    
        },[session.user.email]);
    
        useEffect(()=> {
            console.log(allReports);
            
        },[allReports])


        return <ReportList list={allReports} />;  
        
}