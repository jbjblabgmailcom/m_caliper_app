import classes from "./page.module.css";



export default function YearlySubCard() {

    return (
          
        <div className={`${classes.pricingCard} ${classes.premium}`}>
    <h3 className={classes.planTitle}>Full Access</h3>
    <p className={classes.planPrice}>€100 / year subscription</p>
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