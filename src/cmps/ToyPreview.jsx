import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (
        <article>
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {toy.inStock ?
                <p><span className="positive">Currently in stock</span></p> :
                <p><span className="negative">Out of stock</span></p>}
            <Link to={`/toy/${toy._id}`}>Details</Link>
        </article>
    )
}