import React from "react";
import { Navigate } from "react-router-dom";
import auth from '../firebase.init';
import { useAuthState } from "react-firebase-hooks/auth";

const ProtectedRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        console.log("loading...");
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
