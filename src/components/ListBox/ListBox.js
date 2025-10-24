import SearchInput from '../SearchInput/SearchInput';
import classes from './page.module.css';

export default function ListBox() {

    return (
        <div className={classes.listboxcontainer}>
            Your programs:
            <SearchInput />

        </div>
        );
}