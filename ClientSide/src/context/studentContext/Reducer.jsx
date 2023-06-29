
const Reducer = (state, action) => {
    switch (action.type) {
        case "PROFILE":
            return{
                student: action.payload,
            }
        case "FEE":
            return{
                student: action.payload,
            }
        case "BOOK_EXAM":
            return{
                student: action.payload,
            }
        case "UPDATE":
            return{
                student: action.payload,
            }
        case "UNENROLL":
                return{
                    student: action.payload,
                }
        default:
            return state;
    }
}

export default Reducer