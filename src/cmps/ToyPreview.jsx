import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (
        <article className="toy-preview-art">
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {toy.inStock ?
                <p><span className="positive">Currently in stock</span></p> :
                <p><span className="negative">Out of stock</span></p>}
            <Link className="details-btn" to={`/toy/${toy._id}`}>See More</Link>
        </article>
    )
}