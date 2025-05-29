'use client';

import classes from './page.module.css';
import {useState, useEffect } from 'react';
import { fetchProgramsList } from '@/db/db_server_side.js';
import Link from 'next/link';
import { useLayoutContext } from '@/context/LayoutContext';
import playbutton from '../../../public/playbutton.png';
import editbutton from '../../../public/edit.png';
import Image from 'next/image';

export default function SearchInput() {

    const [initProgList, setInitProgList] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const {trigger} = useLayoutContext();
  


    const handleChange = (e) => {
        setSearchTerm(e.target.value);

    }

    const filteredList = Object.values(initProgList).filter(prog => prog.programname.includes(searchTerm));


    useEffect(()=> {
        const updateProgList = async () => {
            try {
               let result =  await fetchProgramsList();
               setInitProgList(result);
            } catch (error) {
                console.error("Failed to fetch programs", error);
            }

        }
        updateProgList();

    },[trigger]);

    return (
        <div className={classes.searchcontainer}>
        <input type="text" className={classes.searchinput} placeholder="Szukaj..." onChange={handleChange} />
        
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