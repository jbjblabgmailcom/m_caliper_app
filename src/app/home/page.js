import TopMenu from "@/components/TopMenu/topmenu";
import classes from "./page.module.css";
import Image from 'next/image';
import logoImg from '../../../public/logo4.png';
import heightGauge from '../../../public/heightgauge.png';
import caliper from '../../../public/caliper.png';
import anglegauge from '../../../public/anglegauge.png';

export default function AboutPage() {
    
    
    return (
    <>
      <TopMenu />
      <div className={classes.container}>
        <div className={classes.card}>
          <div className={classes.logoContainer}>
            <Image src={logoImg} width={350} alt="Smart CaliperApp logo" className={classes.logo} />
          </div>
          <h1 className={classes.title}>Welcome to Smart CaliperApp</h1>
          <p className={classes.introText}>
            <strong>Smart CaliperApp</strong> is a powerful, browser-based tool designed to enhance and automate the process of dimensional measurement. It&apos;s built for quality control engineers, hobbyists, companies, and students, transforming how you work with digital calipers and gauges.
          </p>
          <p className={classes.connectionText}>
            Unlike traditional software, <strong>Smart CaliperApp</strong> doesn&apos;t require any special drivers or device integrations. It reads input directly from your measurement tools the same way a keyboard sends data to your computer—supporting virtually any device (wired or wireless) that emulates keyboard input.
          </p>
          <div className={classes.logoContainer}>
            <Image src={heightGauge} width={150} alt="Height gauge picture" className={classes.logo} />
          </div>

          <div className={classes.featuresSection}>
            <h2 className={classes.sectionTitle}>Key Features</h2>
            <ul className={classes.featuresList}>
              <li>Create custom measurement programs tailored to your process.</li>
              <li><strong>Step-by-step mode</strong> for controlled, sequential measuring.</li>
              <li><strong>Auto-detection mode</strong> that identifies which feature is being measured.</li>
              <li>Store measurements in the cloud, and access them anytime.</li>
              <li>Generate, view, and print professional reports.</li>
              <li>Seamless login with Google – no installation required.</li>
              <li>Free trial available, with affordable subscription plans.</li>
            </ul>
          </div>
          <div className={classes.logoContainer}>
            <Image src={caliper} width={350} alt="Caliper gauge picture" className={classes.logo} />
          </div>

          <div className={classes.cloudSection}>
            <h2 className={classes.sectionTitle}>Always Available, Always Ready</h2>
            <p className={classes.cloudText}>
              Smart CaliperApp lives in the cloud and is always up to date. No need for installation, setup, or IT support. Just open your browser, log in, and start measuring.
            </p>
            <p className={classes.pricingText}>
              With flexible plans and a free tier, precision is now more accessible than ever.
            </p>
          </div>
          <div className={classes.logoContainer}>
            <Image src={anglegauge} width={350} alt="Angle gauge picture" className={classes.logo} />
          </div>
        </div>
      </div>
    </>
    )
}