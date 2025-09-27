import TopMenu from "@/components/TopMenu/topmenu";
import classes from "./page.module.css";
import Link from "next/link";
import FreeCard from "@/components/PriceCards/freeCard";
import MonthlySubCard from "@/components/PriceCards/monthlySub";
import YearlySubCard from "@/components/PriceCards/yearlySub";
import SingleMonthCard from "@/components/PriceCards/singleMonth";

export default function PricingPage() {
    return (
        <>
            <TopMenu />
            <div className={classes.container}>
                <div className={classes.header}>
                    <h1 className={classes.pricingTitle}>Choose the Right Plan for You</h1>
                    <p className={classes.pricingIntro}>
                        Select a plan that fits your needs, from our free demo to full-featured subscriptions.
                    </p>
                </div>
                <div className={classes.pricingWrapper}>
                    <FreeCard />
                    <MonthlySubCard />
                    <YearlySubCard />
                    <SingleMonthCard />
                </div>
            </div>
        </>
    );
}