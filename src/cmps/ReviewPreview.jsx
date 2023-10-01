export function ReviewPreview({ review }) {
    return (
        <div className="review-preview">
            <h5>{review.txt}</h5>
            <small>Review by: <span style={{ fontWeight: 600 }}>{review.byUser.fullname}</span></small>
        </div>
    )
}
