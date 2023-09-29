import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
// import demoData from './demo-data.service.js'

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toysDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getToyLabels
}

const labels = [ 'Action', 'On wheels', 'Box game', 'Art', 'Baby', 'Cards' , 'Doll', 'Car', 'Puzzle', 'Family', 'Outdoor', 'Battery Powered']
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

function query(filterBy = {}) {
    // return axios.get(BASE_URL).then(res => res.data)
    return httpService.get(BASE_URL, filterBy)


    // return storageService.query(STORAGE_KEY).then(toys => {
    //     let toyCopy = [...toys]
    //     // console.log('toyCopy', toyCopy)

    //     if (filterBy.txt) {
    //         const regExp = new RegExp(filterBy.txt, 'i')
    //         toyCopy = toyCopy.filter(toy => regExp.test(toy.name))
    //         // console.log('toyCopy txt', toyCopy)
    //     }

    //     if (filterBy.inStock !== undefined) {
    //         if (filterBy.inStock === true) {
    //             toyCopy = toyCopy.filter(toy => toy.inStock === true)
    //         } else if (filterBy.inStock === false) {
    //             toyCopy = toyCopy.filter(toy => toy.inStock === false)
    //         }
    //     }

    //     if (filterBy.labels && filterBy.labels.length > 0) {
    //         toyCopy = toyCopy.filter(toy => {
    //             return toy.labels.some(label => filterBy.labels.includes(label))
    //         })
    //     }

    //     return toyCopy
    // })
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
    // return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
    // return Promise.reject('Not now!')
    // return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
        // return storageService.put(STORAGE_KEY, toy)
    } else {
        return httpService.post(BASE_URL, toy)
        // return storageService.post(STORAGE_KEY, toy)
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

function getDefaultFilter() {
    return { txt: '', inStock: undefined, labels: [] }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = toysDemo
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function getToyLabels() {
    return labels
}
