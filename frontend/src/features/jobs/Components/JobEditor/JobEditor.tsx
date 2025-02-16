import {deleteJob, selectJobById, updateJob} from "../../jobsSlice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import type {FormEvent} from "react";
import {createRef, useState} from "react";
import './JobEditor.scss'


export function JobEditor({jobIdx}: { jobIdx: number }) {
    const dispatch = useAppDispatch();
    const job = useAppSelector(state => selectJobById(state, jobIdx));
    const [isEditing, setEditing] = useState<boolean>(false);
    const formRef = createRef<HTMLFormElement>();
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formDataObj = Object.fromEntries(formData);
        const data = {
            ...job,
            ...formDataObj
        };
        dispatch(updateJob({index:jobIdx, job:data}));
        setEditing(false);
    }

    return (
        <form data-testid="job-editor" onSubmit={handleSubmit} ref={formRef} className={"job-editor row" + (isEditing ? " editing" : "")}>
            <input disabled={!isEditing} className="job-editor__address" name="address" type="text" defaultValue={job.address} role={"textbox"} aria-label={"address"} />
            <input data-testid="start-date-input" disabled={!isEditing} className="job-editor__start-time" type="datetime-local" name="startTime" defaultValue={new Date(job.startTime).toISOString().slice(0, 23)}/>
            <input data-testid="end-date-input" disabled={!isEditing} className="job-editor__end-time" type="datetime-local" name="endTime" defaultValue={new Date(job.endTime).toISOString().slice(0, 23)}/>
            <div className={"job-editor__buttons"}>
                <div className={"edit-delete"}>
                    <button aria-label="edit" role={"button"} name="edit" type="button" className={"edit"} onClick={() => setEditing(true)}></button>
                    <button aria-label={"delete"} role={"button"} type="button" className={"delete"} onClick={() => dispatch(deleteJob(jobIdx))}></button>
                </div>
                <div className={"confirm-cancel"}>
                    <button type="submit" className={"confirm"}>Confirm
                    </button>
                    <button type="button" className={"cancel"} onClick={() => setEditing(false)}>Cancel</button>
                </div>
            </div>
        </form>
    )
}