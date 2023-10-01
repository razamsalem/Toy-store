//FETCH
export const uploadImg = async (ev) => {
  //Defining our variables
  const CLOUD_NAME = 'de2rdmsca'
  const UPLOAD_PRESET = 'ewit7een'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData()
  
  //Bulding the request body
  FORM_DATA.append('file', ev.target.files[0])
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)

  // Sending a post method request to Cloudinarys API

  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: FORM_DATA,
    })
    const elImg = document.createElement('img')
    const { url } = await res.json()
    elImg.src = url
    document.body.append(elImg)
  } catch (err) {
    console.error(err)
  }
}

// Old way:
// function uploadImg(ev) {
//   const CLOUD_NAME = 'insert1'
//   const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

//   const formData = new FormData()
//   // console.log('target', ev.target)
//   formData.append('file', ev.target.files[0])
//   // console.log('ev.target.files[0]):', ev.target.files[0])
//   formData.append('upload_preset', 'insert2')
//   // console.log('formData:', formData)

//   return fetch(UPLOAD_URL, {
//     method: 'POST',
//     body: formData,
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       // console.log('res', res)
//       const elImg = document.createElement('img')
//       elImg.src = res.url
//       document.body.append(elImg)
//     })
//     .catch((err) => console.error(err))
// }
