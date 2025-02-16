import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "../../../../app/store";
import { JobsEditorList } from "./JobsEditorList";
import type { RootState } from "../../../../app/store";
import { jobsSlice } from "../../jobsSlice";
import testJobs from "../../../../testJobs.json";
import {describe, it, expect} from "vitest"; // Import JSON data

describe("JobsEditorList", () => {
    const renderWithStore = (preloadedState?: Partial<RootState>) => {
        const store = makeStore(preloadedState);
        return render(
            <Provider store={store}>
                <JobsEditorList />
            </Provider>
        );
    };

    it("renders the correct number of JobEditor components", () => {
        renderWithStore({
            [jobsSlice.name]: testJobs, // Use JSON data
        });

        const jobEditors = screen.getAllByTestId("job-editor");
        expect(jobEditors.length).toBe(testJobs.length);
    });
});
