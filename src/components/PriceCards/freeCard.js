import classes from "./page.module.css";
import Link from "next/link";


export default function FreeCard() {

    return (
          
        <div className={classes.pricingCard}>
            <h3 className={classes.planTitle}>Free Tier</h3>
            <p className={classes.planPrice}>€0 / month</p>
            <ul className={classes.planFeatures}>
            <li>✔ One measuring program</li>
            <li>✔ Google login access</li>
            <li>✔ Cloud-based measurements</li>
            <li>✖ No reports or auto-detection</li>
            </ul>
            <button className={classes.planButton}>Start for Free</button>
        </div>
    )
}