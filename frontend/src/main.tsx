import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import testJobs from './testJobs.json'
import {addJob} from "./features/jobs/jobsSlice";
import {APIProvider} from "@vis.gl/react-google-maps"

testJobs.forEach(job => {
    store.dispatch(addJob(job))
})
const API_KEY: string =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
console.log(API_KEY)


const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <APIProvider apiKey={API_KEY}>
          <App />
        </APIProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
