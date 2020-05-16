import React from "react";

//used to check the login state for auto login

const UserContext = React.createContext({
    loggedIn: false,
    setLoggedin: () => {}
});

export default UserContext;
