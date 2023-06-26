import { createContext, useEffect, useReducer } from "react";
import Reducer from './Reducer'

const INITIAL_STATE ={
    staff: JSON.parse(localStorage.getItem("staff")) || "profile",
}

export const Context = createContext(INITIAL_STATE);

export const StaffContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(()=>{

        localStorage.setItem('staff', JSON.stringify(state.staff))
    }, [state.staff]);
    
    return(
        <Context.Provider value={({ staff: state.staff, dispatch})}>
            { children }
        </Context.Provider>
    )
};