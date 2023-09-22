import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details ->', err)
                showErrorMsg('Oops cannot load toy')
                navigate('/')
                // navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div> // Change to Redux loading instead
    return (
        <section className="toy-details">
            <div className="toy-bio">
                <div className="info">
                    <h1>{toy.name}</h1>
                    <h3>Price: {toy.price}</h3>
                    <h3>Related to: {toy.labels.join(', ')}</h3>
                    {toy.inStock ?
                        <h3><span className="positive">Currently in stock</span></h3> :
                        <h3><span className="negative">Out of stock</span></h3>}
                </div>

                {/* <div className="toy-image">
                <img src="../../assets/img/user.png" alt="Toy image" />
            </div> */}
            </div>

            <div className="btns">
                <Link to="/toy">Back</Link>
                <Link className="details-edit-btn" to={`/toy/edit/${toy._id}`}><i className="fa-solid fa-pen"></i></Link>
            </div>
        </section>
    )
}