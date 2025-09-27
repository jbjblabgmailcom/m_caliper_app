import classes from './page.module.css';

export default function CustomInput({...props}) {

    return(
        <input className={props.className || classes.custominput} {...props} />
    );
}