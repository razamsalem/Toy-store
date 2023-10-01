import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'


export const reviewService = {
    add,
    query,
    remove
}

function query(filterBy) {
    // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    let queryStr
    if (filterBy.byUserId) queryStr = `?byUserId=${filterBy.byUserId}`
    if (filterBy.byToyId) queryStr = `?byToyId=${filterBy.byToyId}`

    return httpService.get(`review${queryStr}`)
    // return storageService.query('review')
}

async function remove(reviewId) {
    await httpService.delete(`review/${reviewId}`)
    // await storageService.remove('review', reviewId)
}

async function add({ txt, toyId }) {
    const addedReview = await httpService.post(`review`, { txt, toyId })
    return addedReview
}