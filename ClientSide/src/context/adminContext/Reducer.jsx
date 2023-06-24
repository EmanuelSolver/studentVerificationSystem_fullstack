
const Reducer = (state, action) => {
    switch (action.type) {
        case "VIEW_STUDENTS":
            return{
                admin: action.payload,
            }
        case "FEE":
            return{
                admin: action.payload,
            }
        case "VIEW_LECTURERS":
            return{
                admin: action.payload,
            }
        case "REGISTER_LECTURER":
            return{
                admin: action.payload,
            }
        case "ADD_ADMIN":
            return{
                admin: action.payload,
            }
        default:
            return state
    }
}

export default Reducer