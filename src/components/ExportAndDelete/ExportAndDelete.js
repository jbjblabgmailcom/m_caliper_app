import Image from "next/image";
import Link from "next/link";
import excellicon from "@/../public/excell.png";
import trashbinicon from "@/../public/trashbinicon.png";
import { handleExport } from "../ReportList/HandleExportToExcell";
import {useState} from 'react';
import classes from './page.module.css';
import { deleteAction } from '@/db/db_server_side';
import { useRouter } from 'next/navigation';


export default function ExportAndDelete({id, redirTo, exp = false, deleteFromTable, deleteMessage}) {

const [viewDecision, setViewDecision] = useState(false);
const [deleteResultState, setDeleteResultState] = useState(false);
 const router = useRouter();


const handleDecision = async (param = false) => {
        if(!param) {
            setViewDecision(!viewDecision);
        } else if (param === "yes") {
            const deleteResult = await deleteAction(id, deleteFromTable);
            console.log("Delete result", deleteResult);
            if(deleteResult != undefined) {
                setDeleteResultState(!deleteResultState);
                setTimeout(() => {
                    console.log("3 seconds passed!");
                        router.push(redirTo);
                    }, 1500);
            }
        }
        

}


    return (
        <>
            <div className={classes.actionpanel}>
                        
                        {/* Export Section */}
                        {exp && 
                        <div className={classes.actiongroup}>
                            <span className={classes.actionlabel}>
                                Export this report to Excel
                            </span>
                            <Link href="#" onClick={() => handleExport(id)}>
                                <Image 
                                    src={excellicon} 
                                    width={50} 
                                    height={50} 
                                    alt="Export to excell"
                                    className={classes.actionicon}
                                />
                            </Link>
                        </div> }

                        {/* Delete Section */}
                        {deleteResultState && <div className={classes.actiongroup}>
                            <span className={classes.actionlabel}>
                                Removed from DB, redirecting
                                <span className={classes.dots}>
                                <span className={classes.dot}>3</span>
                                <span className={classes.dot}>2</span>
                                <span className={classes.dot}>1</span>
                                </span>
                            </span>
                            </div>}

                        {!deleteResultState &&
                        <div className={classes.actiongroup}>
                            <span className={classes.actionlabel}>
                                {deleteMessage}
                            </span>
                            
                            {/* Default Trash Icon / Initial State */}
                            {!viewDecision && (
                                <Image 
                                    src={trashbinicon} 
                                    width={50} 
                                    height={50} 
                                    alt={deleteMessage} 
                                    onClick={() => handleDecision()} 
                                    className={classes.actionicon}
                                />
                            )}

                            {/* Confirmation Buttons / Decision State */}
                            {viewDecision && (
                                <div className={classes.decisiongroup}>
                                    {/* YES Button (Dangerous Action) */}
                                    <span 
                                        className={`${classes.decisionbutton} ${classes.yesbutton}`}
                                        onClick={() => handleDecision("yes")}
                                    >
                                        YES
                                    </span>
                                    
                                    {/* NO Button (Safe Cancel) */}
                                    <span 
                                        className={`${classes.decisionbutton} ${classes.nobutton}`}
                                        onClick={() => handleDecision()}
                                    >
                                        NO
                                    </span>
                                </div>
                            )}
                        </div>
                        }
                    </div>
            
            </>
    );
}