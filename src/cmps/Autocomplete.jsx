import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { toyService } from '../services/toy.service'



export function AutoComplete({ onToyNameSelect }) {
    const [toyNames, setToyNames] = React.useState([])

    React.useEffect(() => {
        toyService.query().then(toys => {
            const names = toys.map(toy => ({ label: toy.name }))
            setToyNames(names)
        })
    }, [])


    function handleToyNameSelect(ev, value) {
        if (value) {
            onToyNameSelect(value.label)
        }
    }

    return (
        <div className="autocomplete-container">
            <Autocomplete
                disablePortal
                className="autocomplete-toyjoy"
                id="combo-box-demo"
                options={toyNames}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="I'm looking for.." />}
                onChange={handleToyNameSelect}
            />
        </div>
    )
}
