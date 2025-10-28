import TopMenu from "@/components/TopMenu/topmenu";
import classes from "./page.module.css";
import Image from "next/image";
import Video from "next-video";


import programlist_page from "../../../public/user_manual/programlist_page.png";
import editIcon from "../../../public/edit.png";
import playIcon from "../../../public/playbutton.png";
import deleteIcon from "../../../public/deleteIcon.png";
import reportIcon from "../../../public/report.png";

import reportPrint from "../../../public/user_manual/report_printing_manual.png";
import reportScreen from "../../../public/user_manual/report_screen_manual.png";
import reportPage from "../../../public/user_manual/reports_page_manual.png";



import filteringPrograms from "@/../videos/filtering-programs.mp4";
import createNewProgram from "@/../videos/create_new_program_manual.mp4";
import editingProgram from "@/../videos/editing_program_manual.mp4";
import playProgram from "@/../videos/play_program_manual.mp4";
import smartProgram from "@/../videos/smart_result_match_manual.mp4";


export default function UserManual() {
    
    // Interactive Guidance Menu (Table of Contents)
    const toc = (
        <div className={classes.tocContainer}>
            <h4 className={classes.tocTitle}>Interactive Menu</h4>
            <ol className={classes.tocList}>
                <li><a href="#section1" className={classes.tocLink}>Navigating the App</a></li>
                <li><a href="#section2" className={classes.tocLink}>Viewing and Interacting with Programs</a></li>
                <li><a href="#section3" className={classes.tocLink}>The Program Filtering Feature: Precision Search 🔍</a></li>
                <li><a href="#section4" className={classes.tocLink}>Creating & Editing Programs</a></li>
                <li><a href="#section5" className={classes.tocLink}>Editing an Existing Program</a></li>
                <li><a href="#section6" className={classes.tocLink}>Running a Measurement Program</a></li>
                <li><a href="#section7" className={classes.tocLink}>Reports: Quality Data Management</a></li>
            </ol>
            <hr />
        </div>
    );

    // Manual content written in JSX
    const manualContent = (
    <div className={classes.manualContent}>
      
        <p className={classes.fancyIntro}>
            Welcome to the SmartCaliper.App! This innovative tool streamlines your precision measurement tasks. The Programs list is your hub for managing all saved measurement programs.
        </p>

    
        {/* Navigation Section */}
        <h3 className={classes.sectionTitle} id="section1">1. Navigating the App</h3>
        <Image src={programlist_page} width="100%" height="100%"  alt="programs list page main page" className={classes.programslist_page_pic}/>
        <table className={classes.manualTable}>
            <thead>
                <tr>
                    <th className={classes.tableHeader}>Button</th>
                    <th className={classes.tableHeader}>Function</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Programs list</td><td>Displays a list of all your saved measurement programs (the current screen).</td></tr>
                <tr><td>New program</td><td>Starts the process of creating and saving a brand-new measurement program.</td></tr>
                <tr><td>Reports</td><td>Accesses measurement data, logs, and compiled reports from completed runs.</td></tr>
            </tbody>
        </table>

        {/* Viewing and Interacting with Programs Section */}
        <h3 className={classes.sectionTitle} id="section2">2. Viewing and Interacting with Programs</h3>
        <p>The main area of the Programs list screen displays your saved programs.</p>
        
        <h4 className={classes.subSectionTitle}>Program List Overview</h4>
        <p>Each program is displayed as a row with three key interaction points:</p>
        <ul>
            <li>Program Name: Displays the unique identifier for the saved program (e.g., `program19881`).</li>
            <li>Edit Program: Click this icon <Image src={editIcon} width={40} height={40} alt="Edit program icon" /> to open the program for editing, allowing you to modify its parameters, settings, or steps.</li>
            <li>Run Program: Click this icon <Image src={playIcon} width={40} height={40} alt="Play program icon" /> to immediately start the measurement program associated with that program.</li>
        </ul>

        {/* Filtering Section */}
        <h3 className={classes.sectionTitle} id="section3">3. The Program Filtering Feature: Precision Search 🔍</h3>
        <div className={classes.movie}>
          <Video src={filteringPrograms} />
        </div>
        
           
        
        <p>Finding the exact program you need among a large list is effortless with the Precision Search filtering bar.</p>
        <p>This feature uses dynamic, real-time filtering—meaning the program list updates immediately as you type, narrowing the results to show only the programs whose names contain the characters you&apos;ve entered.</p>
        
        
        <p className={classes.fancyFeature}>
            ✨ The Fancy Part: This Precision Search doesn&apos;t just filter; it offers a high-speed, dynamic program retrieval system. It transforms a potentially cluttered list into a focused, bespoke directory on the fly. You gain instant visual confirmation of your program&apos;s existence and location, ensuring zero delay between need and action. This efficiency is key to maintaining a rapid, streamlined workflow.
        </p>

        {/* Creating Program Section */}
        <h3 className={classes.sectionTitle} id="section4">4. Creating & Defining Programs</h3>
        <div className={classes.movie}>
            <Video src={createNewProgram} />
        </div>
        
        <p>Start a new program by clicking the <strong>New program </strong>button.</p>

        <h4 className={classes.subSectionTitle}>Defining Measurement Lines (New Program Form)</h4>
        <table className={classes.manualTable}>
            <thead>
                <tr>
                    <th className={classes.tableHeader}>Column Header</th>
                    <th className={classes.tableHeader}>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Bal</td><td>The balance or line number (sequential, e.g., 1, 2, 3...).</td></tr>
                <tr><td>Feature</td><td>Crucial selection. Click the dropdown to select the type of measurement (e.g., Distance, Diameter, Angle, etc.).</td></tr>
                <tr><td>Nominal</td><td>Enter the target or ideal value for this measurement (e.g., 5, 10, 3.6).</td></tr>
                <tr><td>Upper.tol.</td><td>Enter the Upper Tolerance. The positive amount the measurement can exceed the Nominal value and still be acceptable.</td></tr>
                <tr><td>Lower.tol.</td><td>Enter the Lower Tolerance. The negative amount the measurement can drop below the Nominal value and still be acceptable.</td></tr>
                <tr><td>Delete</td><td>Click the <Image src={deleteIcon} width={30} height={40} alt="Delete program line icon" /> icon to remove this specific measurement line from the program.</td></tr>
            </tbody>
        </table>

        
        
        <h4 className={classes.subSectionTitle}>Saving and Measuring</h4>
        <ul>
            <li>Save the Program: Click the Save program button. A confirmation message (&quot;Program saved successfully.&quot;) will appear.</li>
            <li>Measure Now (Optional): After saving, you can immediately begin using the program by clicking the Measure now button.</li>
        </ul>
        <p className={classes.fancyFeature}>
            ✨ The Fancy Part (Program Creation): This interface provides a digital DNA template for your components, crafting a dynamic, pass/fail validation schema to ensure adherence to rigorous standards.
        </p>

        {/* Editing Program Section */}
        <h3 className={classes.sectionTitle} id="section5">5. Editing an Existing Program</h3>
        <div className={classes.movie}>
        <Video src={editingProgram} />
        </div>
        <p>The app allows for effortless modification. Clicking the Edit Program icon takes you to the same robust creation interface.</p>
        
        <h4 className={classes.subSectionTitle}>Accessing the Edit Screen & Versioning Policy</h4>
        <ol>
            <li>Navigate to the Programs list and click the icon <Image src={editIcon} width={40} height={40} alt="Edit program icon" /> on the right side of the program&apos;s row.</li>
            <li>The program&apos;s details will load, ready for modification.</li>
        </ol>
        <p>Versioning Policy (Important!):</p>
        <ul>
            <li>If you change the Program Name during editing, clicking Save program will create a new copy (version) of the program.</li>
            <li>If you do not change the Program Name, clicking Save program will overwrite the original program with your edits.</li>
        </ul>
        
        <h4 className={classes.subSectionTitle}>Saving the Changes</h4>
        <p>After making all desired modifications, click the Save program button. The updated program will be reflected on the Programs list screen.</p>
        <p className={classes.fancyFeature}>
            ✨ The Fancy Part (Editing): Editing is designed for Iterative Precision. Your programs are living, adaptable blueprints, giving you the power to instantly fine-tune your QA process.
        </p>

        {/* Running Program Section */}
        <h3 className={classes.sectionTitle} id="section6">6. Running a Measurement Program</h3>
        <div className={classes.movie}>
        <Video src={playProgram} />
        </div>
       
        <p>Both the <Image src={playIcon} width={40} height={40} alt="Play program icon" /> icon from the list and the Measure now button take you to the Measurement/Run Screen.</p>
        
        <h4 className={classes.subSectionTitle}>The Measurement/Run Screen</h4>
        <table className={classes.manualTable}>
            <thead>
                <tr>
                    <th className={classes.tableHeader}>Column Header</th>
                    <th className={classes.tableHeader}>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Nominal</td><td>The target value defined in the program (Read-only).</td></tr>
                <tr><td>Actual</td><td>The value you physically measure and enter.</td></tr>
                <tr><td>Upper tol. & Lower tol.</td><td>The acceptable positive and negative deviations (Read-only).</td></tr>
            </tbody>
        </table>
        
        <h4 className={classes.subSectionTitle}>Execution & Feedback:</h4>
        <ol>
            <li>Enter Actual Values: Measure the feature and enter the reading into the Actual column.</li>
            <li>Observe Real-time Feedback:
                <ul>
                    <li>Green Background: The measured value is within the defined tolerance. (Pass)</li>
                    <li>Red Background: The measured value is outside the defined tolerance. (Fail)</li>
                </ul>
            </li>
            <li>Save Results: After entering all measurements, click the Save measurement button.</li>
            <li>View Report/Replay: After saving, new options appear: Report ID (view report), Replay (run again), Edit program.</li>
        </ol>
        
        <p className={classes.fancyFeature}>
            ✨ The Fancy Part (Running): Running a program delivers Actionable Intelligence. The real-time color-coding transforms a standard data entry task into a dynamic Quality Assurance checkpoint.
        </p>
        {/* Running smart match feature */}
        <h3 className={classes.sectionTitle} id="section6_1">6.1. Smart Result Match (Auto-Fill Feature)</h3>
        <div className={classes.movie}>
        <Video src={smartProgram}/>
        </div>
       
        <p>The Smart result match feature is designed to automate the data entry process when measurements are taken sequentially, or in environments where the physical measurement order might be slightly irregular.</p>
        
        <h4 className={classes.subSectionTitle}>Activate Smart Match</h4>
        <ol>
            <li>Activate Smart Match:
                <ul>
                    <li>The feature is active when the &quot;Smart result match&quot; checkbox is ticked (it appears to be active by default).</li>
                </ul>
            </li>
            <li>Input Measurement:
                <ul>
                    <li>Instead of clicking into each Actual field one-by-one, you can enter all measured values sequentially into the dedicated AUTO input bar located above the measurement table. This input can be typed manually or received wirelessly from a connected caliper.</li>
                </ul>
            </li>
            <li>Automatic Assignment:
                <ul>
                    <li>The app intelligently compares the incoming measurement value to the Nominal value of each remaining unmeasured line.</li>
                    <li>The measurement is automatically assigned to the line whose Nominal value is closest to the input, provided it is within the defined Matching range (indicated next to the checkbox).</li>
                    <li>Example from Video: Inputting 90.1 is automatically assigned to the Angle line (Nominal 90). Inputting 3.2 is assigned to the Diameter line (Nominal 3).</li>
                    <li>The 1xTol, 2xTol, 3xTol dropdown menu lets you choose the search range. &quot;2x&quot; multiplies the tolerance by 2.</li>
                </ul>
            </li>
        </ol>

        <p>
            Example 1: If nominal is 10+/- 0.1 and your device measures any value from 9.8 to 10.2, the program will match the nominal with the measurement.
        </p>
        <p>
            Example 2: You increase the search range to 3xTol. If nominal is 10+/- 0.1 and your device measures any value from 9.7 to 10.3, the program will match the nominal with the measurement.
        </p>
        <p>
            Example 3: You change the search range to 1xTol. If nominal is 10+/- 0.1 and your device measures any value from 9.9 to 10.1, the program will match the nominal with the measurement.
        </p>
        <p>
            Measurements that don&apos;t find a match will have to be done manually in normal measuring mode.
        </p>
        <p>
            You can switch between normal and Smart Match mode at any time it&apos;s necessary.
        </p>

        <ol start="4">
            <li>Real-time Feedback: 
                <ul>
                    <li>As values are assigned, the Actual field is color-coded: Green (Pass) or Red (Fail).</li>
                </ul>
            </li>
        </ol>
        
        <p className={classes.fancyFeature}>
           ✨ The Fancy Part about Smart Match: This feature is the pinnacle of workflow optimization, leveraging Dynamic Value Recognition. It eliminates the need for strict, value-by-value measurement sequencing, freeing the operator to focus entirely on the physical measurement. By intelligently matching the measured value to the correct step, it provides Unprecedented Speed and Accuracy in data capture, accelerating your Quality Assurance cycle. 
        </p>

        {/* Reports Section */}
        <h3 className={classes.sectionTitle} id="section7">7. Reports: Quality Data Management</h3>
        <Image src={reportPage} width="" height=""  alt="reports list page" className={classes.programslist_page_pic}/>
        <h4 className={classes.subSectionTitle}>Reports List and Filtering</h4>
        <ul>
            <li>Click the Reports button on the main navigation bar.</li>
            <li>Use the &quot;Filter reports by program name...&quot; bar, which operates with the same dynamic, real-time filtering as the Programs list, helping you quickly isolate reports from a specific program.</li>
        </ul>

        <h4 className={classes.subSectionTitle}>Analyzing and Exporting a Detailed Report</h4>
        <Image src={reportScreen} width={600} height={400}  alt="reports list page" className={classes.programslist_page_pic}/>

        <ol>
            <li>Click the icon <Image src={reportIcon} width={40} height={40} alt="report view icon" /> to open the &quot;Measurement report&quot; screen.</li>
            <li>The report table includes the Error and uses Green/Red color-coding for quality assessment.</li>
            <li>Printing/PDF: Initiate the print command in your browser (usually CTRL+P). Change the destination to Save to PDF or print to create a digital, shareable, immutable audit trail.</li>
            <Image src={reportPrint} width={600} height={400}  alt="reports list page" className={classes.programslist_page_pic}/>
        </ol>
        <p className={classes.fancyFeature}>
            ✨ The Fancy Part (Reports): The Reports section transforms raw data into Historical Quality Intelligence. Saving to PDF ensures every component&apos;s history is perfectly preserved and instantly accessible for compliance.
        </p>
    </div>
);
    
    return (
        <>
            <TopMenu />
            <div className={classes.container}>
                <div className={classes.card}>
                    <h2 className={classes.mainTitle}>SmartCaliper.APP User Manual</h2>
                    {toc}
                    {manualContent}
                </div>
            </div>
        </>
    )
}