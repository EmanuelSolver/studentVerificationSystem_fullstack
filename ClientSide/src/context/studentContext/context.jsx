import { createContext, useEffect, useReducer } from "react";
import Reducer from './Reducer'

const INITIAL_STATE ={
    student: JSON.parse(localStorage.getItem("student")) || "profile",
}

export const Context = createContext(INITIAL_STATE);

export const StudentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(()=>{

        localStorage.setItem('student', JSON.stringify(state.student))
    }, [state.student]);
    
    return(
        <Context.Provider value={({ student: state.student, dispatch})}>
            { children }
        </Context.Provider>
    )
};