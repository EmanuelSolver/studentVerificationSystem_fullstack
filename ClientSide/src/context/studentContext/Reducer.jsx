
const Reducer = (state, action) => {
    switch (action.type) {
        case "PROFILE":
            return{
                ui: action.payload,
            }
        case "FEE":
            return{
                ui: action.payload,
            }
        case "BOOK_EXAM":
            return{
                ui: action.payload,
            }
        case "PROGRESS":
            return{
                ui: action.payload,
            }
        default:
            return state;
    }
}

export default Reducer