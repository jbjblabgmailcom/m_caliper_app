import classes from './page.module.css';


export default function DisplayInput ({displayData, ...props}) {

    return <input type="text" className={props.dynstyle || classes.DisplayInput} value={displayData} {...props} />
    
    
}