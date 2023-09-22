import { Link } from "react-router-dom";
import { ToyPreview } from "./ToyPreview";

export function ToyList({ toys, onRemoveToy }) {

    return (
        <section className="grid-container">
            <div className="toy-list-container">
                <ul className="toy-list">
                    {toys.map(toy =>
                        <li className="toy-preview" key={toy._id}>
                            <ToyPreview toy={toy} />
                            <hr />
                            <div>
                                <button className="remove-btn" onClick={() => onRemoveToy(toy._id)}><i className="fa-solid fa-trash"></i></button>
                                <Link className="edit-btn" to={`/toy/edit/${toy._id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                            </div>
                        </li>
                    )}

                </ul>
            </div>
        </section>
    )
}
