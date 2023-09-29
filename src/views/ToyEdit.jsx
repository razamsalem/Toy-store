import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])

    async function loadToy() {
        const desiredToy = await toyService.getById(params.toyId)
        console.log(desiredToy)
        try {
            setToyToEdit(desiredToy)
        } catch (err) {
            console.log('error from ToyEdit =>', err)
            showErrorMsg('Oops! Something went wrong')
        }
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }

    async function onSaveToy(ev) {
        ev.preventDefault()
        await toyService.save(toyToEdit)
        try {
            navigate('/toy')
            console.log(`Toy ${params.toyId} Saved Successfully`)
            showSuccessMsg(`Toy Saved Successfully`)
        } catch (err) {
            console.log('err:', err)
            showErrorMsg(`Toy can't be saved: ${err.message}`)
        }
    }

    // function onBack() {
    //     navigate('/')
    // }

    const { name, price, labels, inStock } = toyToEdit

    return (
        <section className="toy-edit">
            <form onSubmit={onSaveToy} >
                <label htmlFor="name">name:</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                <label htmlFor="price">Price:</label>
                <input onChange={handleChange} value={price} type="number" name="price" id="price" />

                <button>Save</button>
            </form>
        </section>
    )
}
