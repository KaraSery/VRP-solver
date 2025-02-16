import {selectJobs} from "../../jobsSlice";
import {useAppSelector} from "../../../../app/hooks";
import type {Job} from "../../types";
import {JobEditor} from "../JobEditor/JobEditor";
import './JobsEditorList.scss'

export function JobsEditorList() {
    const jobs = useAppSelector(selectJobs)

    return (
        <div className="jobs-editor-list">
            <div className="jobs-editor-list__header row">
                <div className="header__address">Adresse</div>
                <div className="header__start-time">Debut</div>
                <div className="header__end-time">Fin</div>
            </div>
            {jobs.map((job: Job, index) => (
                <JobEditor key={job.address} jobIdx={index}></JobEditor>
            ))}
        </div>
    )
}