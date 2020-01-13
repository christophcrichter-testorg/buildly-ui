import React from "react"

//entryPointForGulpStart
export const app = {
  appTitle: "My App",
  modules: [{"id":"products","title":"Products","description":"Inventory of items"}]
};
//entryPointForGulpEnd

export const AppContext = React.createContext(app);
