import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from "./Navigation";
import Profile from "routes/Profile";



const AppRouter = ({ isLoggedIn }) => {

    return (
        <Router>
            {/* Nav */}
            {isLoggedIn ? <Navigation /> : null}
            <Routes>
                {/* 루트페이지 */}
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                    </>

                ) : (
                    <Route path="/" element={<Auth />} />
                )}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    )
}

export default AppRouter