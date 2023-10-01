import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadToys, removeToyOptimistic, saveToy } from "../store/actions/toy.action.js"
import { SET_FILTER_BY } from "../store/reducers/toy.reducer.js"
import { toyService } from "../services/toy.service.js"
import { ToyList } from "../cmps/ToyList.jsx"
import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyButton } from "../cmps/ToyButton.jsx"
import { uploadImg } from "../services/cloudinary-service.js"


export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log(err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    async function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        toyToSave.name = prompt('Name?')
        toyToSave.price = +prompt('Price?') || 0

        const savedToy = await saveToy(toyToSave)

        try {
            console.log(`Toy added (id: ${savedToy._id})`)
            showSuccessMsg(`Toy added successfully (id: ${savedToy._id})`)
        } catch (err) {
            console.log('Cannot add toy', err)
            showErrorMsg('Cannot add toy')
        }
    }

    async function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
        try {
            console.log(`Toy removed successfully (id: ${toyId})`)
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.log('Cannot remove toy', err)
            showErrorMsg('Cannot remove toy')
        }
    }

    async function onEditToy(toy) {
        const price = +prompt('New price?', toy.price)
        const toyToSave = { ...toy, price }
        const savedToy = await saveToy(toyToSave)
        try {
            console.log(`Toy updated to price: ${savedToy.price}`)
            showSuccessMsg(`Toy updated to price: ${savedToy.price}`)
        } catch (err) {
            console.log('Cannot update toy', err)
            showErrorMsg('Cannot update toy')
        }
    }

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    return (
        <section className="toy-index">
            {user && user.isAdmin && (<ToyButton size={'medium'} func={onAddToy} txt={'New toy'} />)}
            <ToyFilter
                filterBy={filterBy}
                onSetFilter={onSetFilter}
            />

            {isLoading && <div>Loading...</div>}

            {!isLoading && <ToyList
                toys={toys}
                user={user}
                onEditToy={onEditToy}
                onRemoveToy={onRemoveToy}
            />}
            <small>*To add, edit or delete toys you need to be an admin</small>
        </section>
    )
}