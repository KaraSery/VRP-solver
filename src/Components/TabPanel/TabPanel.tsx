import {ReactNode, useContext} from "react";
import {TabsIndexContext} from "../Tabs/Tabs";
import './TabPanel.scss'
export function TabPanel({children, labelID}: { children: ReactNode, labelID: string }) {
    const {label} = useContext(TabsIndexContext)
    return (
        <div className="tab-panel">
            {(label && labelID === label.id) && children}
        </div>
)
}