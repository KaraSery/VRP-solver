import type {ReactNode} from "react";
import {useContext} from "react";
import {TabsIndexContext} from "../Tabs/Tabs";
import './TabPanel.scss'
export function TabPanel({children, labelID}: { children: ReactNode, labelID: string }) {
    const {label} = useContext(TabsIndexContext)
    return (
        <>
            {(label && labelID === label.id) && (
                <div className="tab-panel">
                    {children}
                </div>)}
        </>
)
}