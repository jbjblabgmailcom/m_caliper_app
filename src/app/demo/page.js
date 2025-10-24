import TopMenu from "@/components/TopMenu/topmenu";
import classes from "./page.module.css";
import Link from "next/link";
import Video from "next-video";



import normalModeDemo from "@/../videos/normal_mode_demo.mp4";
import smrT from "@/../videos/smart_match_mode_demo.mp4";

export default function DemoPage() {
    return (
        <>
            <TopMenu />
            <div className={classes.container}>
                <div className={classes.card}>
                    

                    <div className={classes.contentSection}>
                        <h2 className={classes.sectionTitle}>Access the Demo</h2>
                        <p className={classes.demoInfo}>
                            Getting started with Smart CaliperApp is simple. Just <Link href="/auth" className={classes.link}>log in here</Link> using your Google account — no installation or setup required.
                        </p>
                        <p className={classes.demoInfo}>
                            Once logged in, you can start using the demo version immediately. It allows you to create and test two measuring programs, so you can see first hand how the app works.
                        </p>
                    </div>
                    <div className={classes.contentSection}>
                        <h2 className={classes.sectionTitle}>Watch demo video 1 - using a caliper in normal measuring mode</h2>
                        <Video src={normalModeDemo} />
                    </div>

                     <div className={classes.contentSection}>
                        <h2 className={classes.sectionTitle}>Watch demo video 2 - using a caliper in Smart Match measuring mode</h2>
                      <Video src={smrT} />
                    </div>

                    <div className={classes.upgradeSection}>
                        <h2 className={classes.sectionTitle}>Ready for More?</h2>
                        <p className={classes.demoInfo}>
                            If you choose to upgrade, a subscription unlocks full access to all features — including unlimited measuring programs, professional reports, and advanced automation.
                        </p>
                        <Link href="/pricing" className={classes.ctaButton}>See Pricing Plans</Link>
                    </div>
                </div>
            </div>
        </>
    );
}