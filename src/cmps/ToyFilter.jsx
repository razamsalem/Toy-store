import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { ToyButton } from "./ToyButton.jsx"
import { AutoComplete } from "./AutoComplete.jsx"


export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [showLabelOptions, setShowLabelOptions] = useState(false)
    const [showNameInput, setShowNameInput] = useState(false)

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

    function toggleNameInput() {
        setShowNameInput((prevShowNameInput) => !prevShowNameInput)
    }

    function handleToyNameSelect(selectedToyName) {
        setFilterByToEdit((prevFilter) => ({
            ...prevFilter,
            txt: selectedToyName,
        }))
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

    function handleSubmit(ev) {
        ev.preventDefault()
    }


    return (
        <section className="toy-filter">
            <form onSubmit={handleSubmit}>
                <AutoComplete onToyNameSelect={handleToyNameSelect} />

                <button className="btn-show-searchbar" onClick={toggleNameInput}>{showNameInput
                    ? "Hide deep search"
                    : "I want to search more precisely"}</button>

                {showNameInput && (
                    <>
                        <input className="deeper-search"
                            type="text"
                            id="toyName"
                            name="txt"
                            placeholder="Search..."
                            value={filterByToEdit.txt}
                            onChange={handleChange}
                        />
                    </>
                )}

                {/* <ToyButton
                    size={"small"}
                    func={toggleNameInput}
                    txt={
                        showNameInput
                            ? "Hide Name Input"
                            : "I want to search more precisely"
                    }
                /> */}


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

                <ToyButton size={'small'} func={toggleLabelOptions} txt={showLabelOptions ? "Hide Labels" : "Filter by Labels"} />

            </form>

        </section>
    )
}