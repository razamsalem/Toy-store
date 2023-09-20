import { useEffect } from "react"
import { useSelector } from "react-redux"

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadToys, removeToyOptimistic, saveToy } from "../store/actions/toy.action.js"
import { toyService } from "../services/toy.service.js"
import { ToyList } from "../cmps/ToyList.jsx"

export function ToyIndex() {
    // const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    // const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log(err)
                showErrorMsg('Cannot load toys')
            })
    }, [])

    // useEffect(() => {
    //     loadToys()
    //         .catch(err => {
    //             console.log('err:', err)
    //             showErrorMsg('Cannot load toys')
    //         })
    // }, [filterBy])


    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        toyToSave.name = prompt('Name?')
        toyToSave.price = +prompt('Price?')

        saveToy(toyToSave)
            .then(savedToy => {
                console.log(`Toy added (id: ${savedToy._id})`)
                showSuccessMsg(`Toy added successfully (id: ${savedToy._id})`)
            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsg('Cannot add toy')
            })
    }

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                console.log(`Toy removed successfully (id: ${toyId})`)
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?', toy.price)
        const toyToSave = { ...toy, price }
        saveToy(toyToSave)
            .then(savedToy => {
                console.log(`Toy updated to price: ${savedToy.price}`)
                showSuccessMsg(`Toy updated to price: ${savedToy.price}`)
            })
            .catch(err => {
                console.log('Cannot update toy', err)
                showErrorMsg('Cannot update toy')
            })
    }


    return (
        <section className="toy-index">

            <button className="add-toy-btn" onClick={onAddToy}>Add Toy</button>

            {isLoading && <div>Loading...</div>}
            
            {!isLoading && <ToyList
                toys={toys}
                onEditToy={onEditToy}
                onRemoveToy={onRemoveToy}
            />}

        </section>
    )
}