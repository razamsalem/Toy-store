import { ToyPreview } from "./ToyPreview";

export function ToyList({ toys, onEditToy, onRemoveToy }) {

    return (
        <div className="toy-list-container">
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        <button onClick={() => onEditToy(toy)}>Edit</button>
                    </div>
                </li>
            )}

        </ul>
    </div>
    )
}
