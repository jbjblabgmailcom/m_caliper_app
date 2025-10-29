import classes from "./ModeMenu.module.css";

export default function ModeMenu({handleSelectMode, mode}) {
    return <div className={classes.actionpanel}>
        <div className={classes.decisiongroup}>
            
        <p className={`${classes.decisionbutton} ${mode === 'smatch' ? classes.selected : ''}`} onClick={()=> handleSelectMode("smatch")} >S.Match</p>
        <p className={`${classes.decisionbutton} ${mode === 'normal' ? classes.selected : ''}`} onClick={()=> handleSelectMode("normal")} >Caliper</p>
        <p className={`${classes.decisionbutton} ${mode === 'manual' ? classes.selected : ''}`} onClick={()=> handleSelectMode("manual")} >Keyboard</p>

    </div>
    </div>

}