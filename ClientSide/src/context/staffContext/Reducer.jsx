
const Reducer = (state, action) => {
    switch (action.type) {
        case "PROFILE":
            return{
                staff: action.payload,
            }
        
        case "VERIFY_STUDENTS":
            return{
                staff: action.payload,
            }
        case "VERIFIED_STUDENTS":
            return{
                staff: action.payload,
            }
        default:
            return state;
    }
}

export default Reducer