import classes from './page.module.css'


export default function DisplayBox ({displayData, ...props}) {

    return <div className={classes.displayBox} {...props}>
        <p>{displayData}</p>
    </div>
}