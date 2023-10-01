export function ReviewPreview({ review }) {
    return (
        <>
            <h3>{review.txt}</h3>
            <small>Review by: <span style={{ fontWeight: 600 }}>{review.byUser.fullname}</span></small>
        </>
    )
}
