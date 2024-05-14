const submitBtn = document.getElementById('submit')

let generateGif = function () {
    let loader = document.querySelector('.loader')
    loader.style.display = 'block'
    document.querySelector('.result').innerHTML = ''

    let q = document.getElementById('query').value

    let gifCount = 12

    let URL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`


    fetch(URL).then(j => j.json()).then(all => {
        let gifsArray = all.data
        console.log(gifsArray)
        if(gifCount !== 0) {
            loader.style.display = 'none'
        }
        gifsArray.forEach(items => {
            let con = document.createElement('div')
            con.classList.add('item')
            let igif = document.createElement('img')
            igif.setAttribute('src', items.images.downsized_large.url)
            let p = document.createElement('p')
            p.classList.add('title')
            p.innerText = `${items.title}`
            con.append(igif)
            con.append(p)

            let copyBtn = document.createElement('button')
            copyBtn.innerText = 'Copy Link'
            copyBtn.onclick = () => {
                let copy = `https://media4.giphy.com/media/${items.id}/giphy.mp4`
                navigator.clipboard.writeText(copy).then(alert('GIF copied to clipboard.'))
            }

            con.append(copyBtn)
            document.querySelector('.result').append(con)
        })
    })

}


submitBtn.addEventListener('click', generateGif)
generateGif()