import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { loadReviews } from "../store/actions/toy.action.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { reviewService } from "../services/review.service.js"
import { ReviewList } from "../cmps/ReviewList.jsx"
import { ReviewToy } from "../cmps/ReviewToy.jsx"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [reviews, setReviews] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        onLoadToy()
        onLoadReviews()

    }, [toyId])

    async function onLoadToy() {
        const desiredToy = await toyService.getById(toyId)
        try {
            setToy(desiredToy)
        } catch (err) {
            console.log('Had issues in toy details ->', err)
            showErrorMsg('Oops cannot load toy')
            navigate('/')
        }
    }

    async function onLoadReviews() {
        try {
            const reviews = await reviewService.query({ byToyId: toyId })
            setReviews(reviews)
        } catch (err) {
            console.log(`error loading reviews in toyDetails: ${err.message}`)
        }
    }

    async function onReviewToy(review) {
        review.toyId = toyId

        try {
            await reviewService.add(review)
            showSuccessMsg('Review added successfully')
            onLoadReviews()
        } catch (err) {
            showErrorMsg('Please login to review')
        }
    }

    if (!toy) return <div>Loading...</div> // Change to Redux loading instead
    return (
        <section className="toy-details">
            <div className="toy-bio">
                <div className="info">
                    <h1>{toy.name}</h1>
                    {/* <img src="https://res.cloudinary.com/de2rdmsca/image/upload/v1696178312/Talking_Doll_d6ojir.png" alt="" /> */}
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

            <section className="reviews">
                Reviews:
                <ReviewList reviews={reviews} />
                <ReviewToy onReviewToy={onReviewToy}/>
            </section>

            <div className="btns">
                <Link to="/toy">Back</Link>
                <Link className="details-edit-btn" to={`/toy/edit/${toy._id}`}><i className="fa-solid fa-pen"></i></Link>
            </div>
        </section>
    )
}