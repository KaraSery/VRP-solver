import {TabsIndexContext} from "../Tabs/Tabs";
import {Component, createRef, ReactNode, useContext, useEffect, useState} from "react";
import './TabLabel.scss'

interface TabLabelProps {
    children: ReactNode;
    id: string;
    selected?: boolean;
}
const defaultProps = {
    selected: false,
}
export function TabLabel({ children, id, selected, ...defaultProps }: TabLabelProps): ReactNode {
    const {handleChange} = useContext(TabsIndexContext);
    const label = createRef<HTMLElement>();
    useEffect(() => {
        (selected && label.current) && handleChange(label.current!)
    }, []);
    return (
        <span className='tab-label' ref={label} id={id} onClick={()=>handleChange(label.current!)}>
            {children}
        </span>
    )
}