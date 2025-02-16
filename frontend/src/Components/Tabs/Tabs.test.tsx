import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "./Tabs";
import {describe, it, expect} from "vitest"
import {TabControl} from "../TabControl/TabControl";
import {TabPanel} from "../TabPanel/TabPanel";
import {TabLabel} from "../TabLabel/TabLabel";

describe("Tabs Component", () => {
    it("should update selected tab when TabLabel is clicked", () => {
        render(
            <Tabs>
                <TabControl>
                    <TabLabel selected={true} id="tab1">Tab 1</TabLabel>
                    <TabLabel id="tab2">Tab 2</TabLabel>
                </TabControl>
                <TabPanel labelID="tab1">Content 1</TabPanel>
                <TabPanel labelID="tab2">Content 2</TabPanel>
            </Tabs>
        );

        const tab1 = screen.getByText("Tab 1");
        const tab2 = screen.getByText("Tab 2");

        // Initially, only the first tab's content should be visible
        expect(screen.getByText("Content 1")).toBeInTheDocument();
        expect(screen.queryByText("Content 2")).toBeNull();

        // Click on Tab 2 and verify content change
        fireEvent.click(tab2);

        expect(screen.getByText("Content 2")).toBeInTheDocument();
        expect(screen.queryByText("Content 1")).toBeNull();
    });
});
