import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Developers from "./pages/Developers";
import DeveloperDetails from "./pages/DeveloperDetails";
import Jobs from "./pages/Jobs";


function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/developers"
                    element={<Developers />}
                />

                <Route
                    path="/developers/:id"
                    element={<DeveloperDetails />}
                />

                <Route
                    path="/jobs"
                    element={<Jobs />}
                />

            </Routes>

        </BrowserRouter>

    );
}


export default App;