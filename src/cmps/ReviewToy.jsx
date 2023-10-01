import { useState } from "react"

export function ReviewToy({ onReviewToy }) {
    const [reviewToAdd, editReviewToAdd] = useState(null)

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
        editReviewToAdd(prevReview => ({ ...prevReview, [field]: value }))
    }

    return (
        <form className="review-toy-form"
            onChange={handleChange}
            onSubmit={(ev) => {
                ev.preventDefault()
                onReviewToy(reviewToAdd)
            }}>
            <label className="add-review-input">
                Review:
                <input type="text" name="txt" placeholder="Add your review.." required />
            </label>
            <button className="btn send-msg">
                Send
            </button>
        </form>
    )
}
