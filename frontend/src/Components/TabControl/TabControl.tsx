import {createRef, ReactNode, useContext, useEffect} from "react";
import {TabsIndexContext} from "../Tabs/Tabs";
import "./TabControl.scss"


export function TabControl({children}: {children: ReactNode}) {
    const {label} = useContext(TabsIndexContext)
    const selectorRef = createRef<HTMLDivElement>();
    const navRef = createRef<HTMLElement>();
    useEffect(() => {
        if(selectorRef.current && navRef.current && label) {
            const navBounding = navRef.current.getBoundingClientRect();
            const labelBounding = label.getBoundingClientRect();
            const translateX = labelBounding.x - navBounding.x;
            const scaleX = labelBounding.width
            selectorRef.current.style.transform = `translateX(${translateX}px) scaleX(${scaleX})`;
        }
    }, [label]);
    return (
        <nav className='tab-control' ref={navRef}>
            {children}
            <div ref={selectorRef} className={'selector'}></div>
        </nav>
    )
}