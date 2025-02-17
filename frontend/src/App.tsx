import "./App.scss"
import {GoogleMapProvider} from "./Components/GoogleMapProvider/GoogleMapProvider";
import {GoogleMap} from "./Components/googleMap/GoogleMap";
import {TabControl} from "./Components/TabControl/TabControl";
import {Tabs} from "./Components/Tabs/Tabs";
import {TabLabel} from "./Components/TabLabel/TabLabel";
import {TabPanel} from "./Components/TabPanel/TabPanel";
import {JobsEditorList} from "./features/jobs/Components/JobsEditorList/JobsEditorList";
import {Loader} from "@googlemaps/js-api-loader";
import {Map} from '@vis.gl/react-google-maps';
import { JobAddForm } from "./features/jobs/Components/JobAddForm/JobAddForm"
import { JobsMap } from "./features/jobs/Components/JobsMap/JobsMap"
import { useAppSelector } from "./app/hooks"
import { selectJobs } from "./features/jobs/jobsSlice"
import { SolverButton } from "./features/routesAPI/SolverButton/SolverButtons"



// const googleMapLoader = new Loader({
//     apiKey: "AIzaSyBP6u8z1Wter_Uk1PEInnHBg8SV_f4Vxhk",
//     version: "weekly"
// });
const App = () => {
  const jobs = useAppSelector(selectJobs);
  return (
            <Tabs>
                <TabControl>
                    <TabLabel selected={true} id="map">Map</TabLabel>
                    <TabLabel id="jobs-editor">Jobs</TabLabel>
                    <TabLabel id="jobs-add-form">Add Job</TabLabel>
                    <TabLabel id="solver">Solve</TabLabel>
                </TabControl>
                <TabPanel labelID="map">
                    <JobsMap jobsIdx={jobs.map((_, idx)=> idx)}/>
                </TabPanel>
                <TabPanel labelID="jobs-editor">
                    <JobsEditorList/>
                </TabPanel>
                <TabPanel labelID="jobs-add-form">
                    <JobAddForm/>
                </TabPanel>
                <TabPanel labelID="solver">
                    <SolverButton/>
                </TabPanel>
            </Tabs>
    )
}

export default App
