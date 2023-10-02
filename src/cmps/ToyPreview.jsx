import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    const defaultImgUrl = 'https://res.cloudinary.com/de2rdmsca/image/upload/v1696229330/no-image-symbol-missing-available-icon-gallery-vector-47533708_yv5p2x.jpg'
   
    return (
        <article className="toy-preview-art">
            <h4>{toy.name}</h4>
            <img className="toy-img" src={toy.imgUrl ? toy.imgUrl : defaultImgUrl} alt="" />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {toy.inStock ?
                <p><span className="positive">Currently in stock</span></p> :
                <p><span className="negative">Out of stock</span></p>}
            <Link className="details-btn" to={`/toy/${toy._id}`}>See More</Link>
        </article>
    )
}