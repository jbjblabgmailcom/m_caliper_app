import classes from "./page.module.css";
import Link from "next/link";


export default function SingleMonthCard() {

    return (
          
        <div className={`${classes.pricingCard} ${classes.premium}`}>
    <h3 className={classes.planTitle}>Full Access 1 month</h3>
    <p className={classes.planPrice}>€9.99 / month</p>
    <ul className={classes.planFeatures}>
      <li>✔ Unlimited measuring programs</li>
      <li>✔ Full access to reports & printing</li>
      <li>✔ Auto-detection measurement mode</li>
      <li>✔ Priority support</li>
    </ul>
    <button className={classes.planButton}>Upgrade Now</button>
  </div>
    )
}