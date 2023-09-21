import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { ToyButton } from "./ToyButton.jsx"


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [showLabelOptions, setShowLabelOptions] = useState(false)

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function toggleLabelOptions() {
        setShowLabelOptions((prevShowLabelOptions) => !prevShowLabelOptions)
        if (!showLabelOptions) {
            setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: [] }))
        }
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        // console.dir(target)
        if (field === 'inStock' && value === '') {
            value = ''
        } else if (type === 'select-one') {
            value = value === 'true'
        } else if (type === 'number') {
            value = +value || ''
        } else if (type === 'checkbox') {
            const label = value
            const currentLabels = filterByToEdit.labels

            if (target.checked && !currentLabels.includes(label)) {
                value = [...currentLabels, label]
            } else {
                value = currentLabels.filter(selectedLabel => selectedLabel !== label)
            }
        } else if (type === 'select-multiple') {
            value = Array.from(target.selectedOptions, (option) => option.value)
        }

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    return (
        <section className="toy-filter">
            <h2>Toys Filter</h2>
            <form >

                <label htmlFor="toyName">Name:</label>
                <input type="text"
                    id="toyName"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                {/* <label htmlFor="inStock">Filter by stock:</label>
                <select value={filterByToEdit.inStock} name="inStock" id="inStock" onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Out Of Stock</option>
                </select> */}

                {showLabelOptions && toyService.getToyLabels().map(label => (
                    <div key={label}>
                        <input
                            type="checkbox"
                            name="labels"
                            id={label}
                            value={label}
                            checked={filterByToEdit.labels.includes(label)}
                            onChange={handleChange}
                        />
                        <label htmlFor={label}>{label}</label>
                    </div>
                ))}

                <ToyButton func={toggleLabelOptions} txt={showLabelOptions ? "Hide Labels" : "Filter by Labels"} />

            </form>

        </section>
    )
}