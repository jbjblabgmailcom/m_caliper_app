import TopMenu from "@/components/TopMenu/topmenu";
import classes from "./page.module.css";


export default function AboutPage() {
    
    
    return (
    <>
    <TopMenu />
    <div className={classes.container}>
      <div className={classes.card}>
    <h2>Instructions here. User manual</h2>
    </div>
    </div>
    </>
    )
}