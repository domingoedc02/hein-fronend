import React from "react";


// Create a Context object
// A context object as the name state is a data type of an object that can be used to store information that can be shared to others components within the app.

const UserContext = React.createContext();

// The provider components allows other components to consume/use the context objects and supply the necessary information needed to the context object
export const UserProvider = UserContext.Provider

export default UserContext