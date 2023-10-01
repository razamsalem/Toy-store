import { ReviewPreview } from "./ReviewPreview"

export function ReviewList({ reviews }) {
    return (
        !reviews ? 'Loading Reviews..' : reviews.map(review => <ReviewPreview key={review._id} review={review} />)
    )
}