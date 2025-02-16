import {TabsIndexContext} from "../Tabs/Tabs";
import type {ReactNode} from "react";
import {createRef, useContext, useEffect} from "react";
import './TabLabel.scss'

interface TabLabelProps {
    children: ReactNode;
    id: string;
    selected?: boolean;
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