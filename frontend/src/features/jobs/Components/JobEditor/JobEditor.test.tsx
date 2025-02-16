import {render, screen, fireEvent} from "@testing-library/react";
import {Provider} from "react-redux";
import {makeStore} from "../../../../app/store";
import {JobEditor} from "./JobEditor";
import type {RootState} from "../../../../app/store";
import {jobsSlice} from "../../jobsSlice";
import testJobs from "../../../../testJobs.json";
import {describe, it, expect} from "vitest";


// const dateTimeFormat = Intl.DateTimeFormat(undefined, {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     timeZone: "UTC",
// })

describe("JobEditor", () => {
    const renderWithStore = (preloadedState?: Partial<RootState>) => {
        const store = makeStore(preloadedState);
        return render(
            <Provider store={store}>
                <JobEditor jobIdx={0}/>
            </Provider>
        );
    };

    it("renders job data correctly", () => {
        renderWithStore({
            [jobsSlice.name]: testJobs, // Load state with test data
        });


        const startTimeValue = new Date(testJobs[0].startTime).toISOString().slice(0, 16)
        const endTimeValue = new Date(testJobs[0].endTime).toISOString().slice(0, 16)

        const startDateInput = screen.getByTestId("start-date-input");
        const endDateInput = screen.getByTestId("end-date-input");
        expect(startDateInput).toHaveValue(startTimeValue);
        expect(endDateInput).toHaveValue(endTimeValue);
        expect(screen.getByDisplayValue(testJobs[0].address)).toBeInTheDocument();
    });

    it("enables editing mode when edit button is clicked", () => {
        renderWithStore({
            [jobsSlice.name]: testJobs,
        });

        const editButton = screen.getByRole("button", {name: /edit/i});
        fireEvent.click(editButton);

        const addressInput = screen.getByRole("textbox", {name: /address/i});
        expect(addressInput).not.toBeDisabled();
    });

    it("dispatches updateJob on form submit", () => {
        const store = makeStore({
            [jobsSlice.name]: testJobs,
        });
        render(
            <Provider store={store}>
                <JobEditor jobIdx={0}/>
            </Provider>
        );

        const editButton = screen.getByRole("button", {name: /edit/i});
        fireEvent.click(editButton);

        const addressInput = screen.getByRole("textbox", {name: /address/i});
        fireEvent.change(addressInput, {target: {value: "New Address"}});

        const submitButton = screen.getByRole("button", {name: /confirm/i});
        fireEvent.click(submitButton);

        const actions = store.getState()[jobsSlice.name];
        expect(actions[0].address).toBe("New Address");
    });

    it("dispatches deleteJob on delete button click", () => {
        const store = makeStore({
            [jobsSlice.name]: testJobs,
        });
        render(
            <Provider store={store}>
                <JobEditor jobIdx={0}/>
            </Provider>
        );

        const deleteButton = screen.getByRole("button", {name: /delete/i});
        fireEvent.click(deleteButton);

        const actions = store.getState()[jobsSlice.name];
        expect(actions.length).toBe(testJobs.length - 1);
    });
});
