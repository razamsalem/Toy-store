import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import demoData from './demo-data.service.js'

const STORAGE_KEY = 'toysDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
}

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Car', 'Puzzle', 'Outdoor', 'Battery Powered']

const toysDemo = [
    {
        _id: 't101',
        name: 'Talking Doll',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
    },
    {
        _id: 't102',
        name: 'RC Car',
        price: 89, 
        labels: ['Outdoor', 'On wheels', 'Battery Powered'],
        createdAt: 1631031801011,
        inStock: false,
    }
]

_createToys()

function query(filterBy = { name: '' }) {
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            //     if (filterBy.txt)
            //         toys = toys.filter(t => t.title.toLowerCase().includes(filterBy.txt.toLowerCase()))
            //     if (filterBy.status === 'done') return toys.filter(t => t.isDone)
            //     else if (filterBy.status === 'active') return toys.filter(t => !t.isDone)

            return toys
        }
        )
}
function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // todo.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        inStock: true
    }
}


function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = toysDemo
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}