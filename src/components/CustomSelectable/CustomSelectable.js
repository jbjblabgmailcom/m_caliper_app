import classes from './page.module.css';

export default function CustomSelectable({...props}) {

    return(
        <select className={props.className || classes.customselectable} {...props}>
            <option value="odleglosc" defaultValue>Odleg</option>
            <option value="srednica" >⌀</option>
            <option value="kat">∡</option>
            <option value="pozx">x</option>
            <option value="pozy">y</option>
            <option value="pozz">z</option>
            <option value="poz">⌖</option>
        </select>
    );
}