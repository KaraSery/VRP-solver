import {createContext, ReactNode, useState} from "react";
import './Tabs.scss'

interface TabIndexContext {
    label: HTMLElement | null;
    handleChange: (label: HTMLElement)=>void;
}
export const TabsIndexContext = createContext<TabIndexContext>({
    label: null,
    handleChange: ()=>{}
})

export function Tabs({children}: {children: ReactNode}) {
    const [label, setLabel] = useState<HTMLElement | null>(null);

    function handleChange(label: HTMLElement) {
        setLabel(label);
    }
    return (
        <TabsIndexContext.Provider value={{label: label, handleChange}}>
            <div className='tabs-wrapper'>
                {children}
            </div>
        </TabsIndexContext.Provider>
    )
}