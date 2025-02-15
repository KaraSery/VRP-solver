import "./App.scss"
import {GoogleMapProvider} from "./Components/GoogleMapProvider/GoogleMapProvider";
import {GoogleMap} from "./Components/googleMap/GoogleMap";
import {TabControl} from "./Components/TabControl/TabControl";
import {Tabs} from "./Components/Tabs/Tabs";
import {TabLabel} from "./Components/TabLabel/TabLabel";
import {TabPanel} from "./Components/TabPanel/TabPanel";


const App = () => {
    return (
        <GoogleMapProvider>
            <Tabs>
                <TabControl>
                    <TabLabel selected={true} id="map">Map</TabLabel>
                </TabControl>
                <TabPanel labelID="map">
                    <GoogleMap/>
                </TabPanel>
            </Tabs>
        </GoogleMapProvider>
    )
}

export default App
