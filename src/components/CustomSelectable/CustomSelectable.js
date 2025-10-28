import classes from './page.module.css';

export default function CustomSelectable({displayData, ...props}) {
   
    if(displayData) {
        
        return <div className={props.displayclass === "report" ? classes.displayBoxForReport : classes.displayBox}>
        {displayData === "distance" && <p>Dist</p>}
        {displayData === "diameter" && <p>⌀</p>}
        {displayData === "angle" && <p>∡</p>}
        {displayData === "posx" && <p>x</p>}
        {displayData === "posy" && <p>y</p>}
        {displayData === "posz" && <p>z</p>}
        {displayData === "pos" && <p>⌖</p>}
    </div>
        } else  {
        return(
        <select className={props.className || classes.customselectable} {...props}>
            <option value="distance" defaultValue>Distance</option>
            <option value="diameter" >⌀</option>
            <option value="angle">∡</option>
            <option value="posx">x</option>
            <option value="posy">y</option>
            <option value="posz">z</option>
            <option value="pos">⌖</option>
        </select>
    );
    }

    
} 