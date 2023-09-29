import { showSuccessMsg } from "../../services/event-bus.service.js"
import { toyService } from "../../services/toy.service.js"
import { SET_TOYS, REMOVE_TOY, SET_IS_LOADING, UNDO_TOY, UPDATE_TOY, ADD_TOY } from "../reducers/toy.reducer.js"
import { store } from "../store.js"

export async function loadToys() {
    const { filterBy } = store.getState().toyModule

    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const toys = await toyService.query(filterBy)
    try {
        // showSuccessMsg('Toys Reloaded successfully')
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('toy action -> cannot load toys', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeToy(toyId) {
    const _ = await toyService.remove(toyId)
    try {
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.log('toy action -> Cannot remove toy', err)
        throw err
    }
}

export async function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    const _ = await toyService.remove(toyId)
    try {
        console.log('removed successfully')
    } catch (err) {
        store.dispatch({ type: UNDO_TOY })
        console.log('toy action -> Cannot remove toy', err)
        throw err
    }
}

export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    const toyToSave = await toyService.save(toy)

    try {
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
    } catch (err) {
        console.log('Toy action -> Cannot save toy', err)
        throw err
    }
}