export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const UNDO_TOY = 'UNDO_TOY'

// export const SET_FILTER = 'SET_FILTER'
// export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
    lastToys: [],
    isLoading: false
    // filter: 'all',
    // searchQuery: '',
}

export function toyReducer(state = initialState, action = {}) {
    let toys
    let lastToys

    switch (action.type) {

        case SET_TOYS:
            lastToys = [...action.toys]
            return { ...state, toys: action.toys, lastToys }

        case REMOVE_TOY:
            lastToys = [...state.toys]
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys, lastToys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        case UNDO_TOY:
            toys = [...state.lastToys]
            return { ...state, toys }

        //Filter
        // case SET_FILTER:
        //     return { ...state, filter: action.newFilter }

        // case SET_SEARCH_QUERY:
        //     return { ...state, searchQuery: action.searchQuery }

        //Toy general
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state
    }

}