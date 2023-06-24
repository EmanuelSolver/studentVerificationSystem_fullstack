import { createContext, useEffect, useReducer } from "react";
import Reducer from './Reducer'

const INITIAL_STATE ={
    admin: JSON.parse(localStorage.getItem("admin")) || "viewStudents",
}

export const Context = createContext(INITIAL_STATE);

export const AdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(()=>{

        localStorage.setItem('admin', JSON.stringify(state.admin))
    }, [state.admin]);
    
    return(
        <Context.Provider value={({ admin: state.admin, dispatch})}>
            { children }
        </Context.Provider>
    )
};