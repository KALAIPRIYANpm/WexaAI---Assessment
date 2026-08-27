import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import Dashboard from "./pages/Dashboard";
import Developers from "./pages/Developers";
import DeveloperDetails from "./pages/DeveloperDetails";
import Jobs from "./pages/Jobs";


function App() {

    return (

        <BrowserRouter>

            <Navbar />

 <ErrorBoundary>
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
</ErrorBoundary>
        </BrowserRouter>

    );
}


export default App;