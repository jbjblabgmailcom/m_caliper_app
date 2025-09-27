import TopMenu from "@/components/TopMenu/topmenu";
import classes from "./page.module.css";
import Link from "next/link";

export default function DemoPage() {
    return (
        <>
            <TopMenu />
            <div className={classes.container}>
                <div className={classes.card}>
                    <h1 className={classes.title}>How to Try Our App</h1>

                    <div className={classes.contentSection}>
                        <h2 className={classes.sectionTitle}>Access the Demo</h2>
                        <p className={classes.demoInfo}>
                            Getting started with **Smart CaliperApp** is simple. Just <Link href="/auth" className={classes.link}>log in here</Link> using your Google account — no installation or setup required.
                        </p>
                        <p className={classes.demoInfo}>
                            Once logged in, you can start using the demo version immediately. It allows you to create and test **one measuring program**, so you can see firsthand how the app works.
                        </p>
                    </div>

                    <div className={classes.upgradeSection}>
                        <h2 className={classes.sectionTitle}>Ready for More?</h2>
                        <p className={classes.demoInfo}>
                            If you choose to upgrade, a subscription unlocks full access to all features — including **unlimited measuring programs, professional reports**, and **advanced automation**.
                        </p>
                        <Link href="/pricing" className={classes.ctaButton}>See Pricing Plans</Link>
                    </div>
                </div>
            </div>
        </>
    );
}