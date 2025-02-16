import "./App.scss"
import {GoogleMapProvider} from "./Components/GoogleMapProvider/GoogleMapProvider";
import {GoogleMap} from "./Components/googleMap/GoogleMap";
import {TabControl} from "./Components/TabControl/TabControl";
import {Tabs} from "./Components/Tabs/Tabs";
import {TabLabel} from "./Components/TabLabel/TabLabel";
import {TabPanel} from "./Components/TabPanel/TabPanel";
import {JobsEditorList} from "./features/jobs/Components/JobsEditorList/JobsEditorList";
import {Loader} from "@googlemaps/js-api-loader";

const googleMapLoader = new Loader({
    apiKey: "AIzaSyBP6u8z1Wter_Uk1PEInnHBg8SV_f4Vxhk",
    version: "weekly"
});
const App = () => {
    return (
        <GoogleMapProvider loader={googleMapLoader}>
            <Tabs>
                <TabControl>
                    <TabLabel selected={true} id="map">Map</TabLabel>
                    <TabLabel id="jobs-editor">Jobs</TabLabel>
                </TabControl>
                <TabPanel labelID="map">
                    <GoogleMap/>
                </TabPanel>
                <TabPanel labelID="jobs-editor">
                    <JobsEditorList/>
                </TabPanel>
            </Tabs>
        </GoogleMapProvider>
    )
}

export default App
