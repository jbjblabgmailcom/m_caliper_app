import classes from './page.module.css';

export default function ProgramButton({ children, ...props}) {

    return (
        <button className={props.className || classes.button} onClick={props.onClick}>{children}</button>
    );
}