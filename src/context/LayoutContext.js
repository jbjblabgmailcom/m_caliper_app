"use client";

import { createContext, useContext, useState } from "react";


const LayoutContext = createContext();


export default function LayoutProvider({ children }) {
    
    const [trigger, setTrigger] = useState(false);
    const toggleTrigger = () => {
        setTrigger((prevTrigger)=> !prevTrigger);
    }

    const contextValue = {
        trigger,
        toggleTrigger,
    };

    return (
        <LayoutContext.Provider value={contextValue}>
            {children}
        </LayoutContext.Provider>
    );
}


export function useLayoutContext() {
    return useContext(LayoutContext);
}