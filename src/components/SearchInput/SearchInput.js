'use client';

import classes from './page.module.css';
import {useState, useEffect } from 'react';
import { fetchProgramsList } from '@/db/db_server_side.js';
import Link from 'next/link';
import { useLayoutContext } from '@/context/LayoutContext';
import playbutton from '../../../public/playbutton.png';
import editbutton from '../../../public/edit.png';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { fetchUserData } from '@/db/db_server_side';

export default function SearchInput() {

    const [initProgList, setInitProgList] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const {trigger} = useLayoutContext();
    const { data: session } = useSession();
    const [usrData, setusrData] = useState({});
    
      useEffect(()=>{
        const userData = async () => {
          const result = await fetchUserData(session.user.email);
          setusrData(result);
          
        }
    
        userData();
      },[]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);

    }

    const filteredList = Object.values(initProgList).filter(prog => prog.programname.includes(searchTerm));


    useEffect(()=> {
        const updateProgList = async () => {
            let result; 
            try {
                if(Object.keys(usrData || {}).length === 0) {
                result =  await fetchProgramsList(session.user.email, 2);  
                } else {
                    result =  await fetchProgramsList(session.user.email);
                    
                }
               setInitProgList(result);
            } catch (error) {
                console.error("Failed to fetch programs", error);
            }

        }

        
                updateProgList();
        
        

    },[usrData]);

    return (
        <div className={classes.searchcontainer}>
        <input type="text" className={classes.searchinput} placeholder="Szukaj..." onChange={handleChange} />
            {Object.keys(usrData || {}).length === 0 && (
                <div><p>Limited to two active programs. Please <Link href="/checkout"><span className={classes.spanlink}>upgrade here </span></Link> </p></div>
                    )}
        <div className={classes.ulcontainer}>
            <ul className={classes.ul}>
                {Object.values(filteredList).map((prog, index) => (
                    <li  key={prog.programid} className={classes.li}>
                        
                        <div className={classes.borderDiv}><Link href={`/program/${prog.programid}`}><div className={classes.extraDiv}>{prog.programname}</div></Link></div>
                        <div className={classes.borderDiv}><Link href={`/program/${prog.programid}`}><Image src={editbutton} alt="edit button" width="35" /></Link></div>
                        <div className={classes.borderDiv}><Link href={`/play/${prog.programid}`}><Image src={playbutton} alt="play button" width="35" /></Link></div>
                        
                        </li>
                ))}
            </ul>
        </div>
        
        </div>
    );
}