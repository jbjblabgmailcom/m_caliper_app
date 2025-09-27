import classes from './page.module.css';


export default function DisplayInput ({...props}) {

    return <input type="text" className={props.dynstyle || classes.DisplayInput}  {...props} />
    
    
}