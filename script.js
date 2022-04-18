const id = "AIzaSyCA025moIi_p06TNeLPGjfbsr9COxzOEZ8"
const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${id}&maxResults=10&q=` // try code
const request = new XMLHttpRequest()
let data;
const iframe = document.querySelector("iframe")
const main = document.querySelector("main")
const input = document.querySelector("input")
const btn = document.querySelector("button")

// curl \
//   'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=Arcane&key=[YOUR_API_KEY]' \ mi smo stavili search na kraj da ga dinamicki dodajemo
//   --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
//   --header 'Accept: application/json' \
//   --compressed


function fetchData(){
    main.innerHTML=""
    request.open("GET", url+input.value)

    request.send()

    request.onload = function(){
     // console.log(request.responseText)
     data = JSON.parse(request.responseText)
        console.log(data)
        createVideos(data.items)
        iframe.setAttribute("height","0")
        iframe.setAttribute("src","")
        
        
    }
}


function createVideos(arr){
    arr.forEach((e,i,arr) => {
        let video = document.createElement("div")
        let image = document.createElement("img")
        let title = document.createElement("h4")
        let desc = document.createElement("p")

        image.setAttribute("src", e.snippet.thumbnails.high.url)
        title.innerHTML = e.snippet.title
        // desc.innerHTML = e.snippet.description

        video.append(image, title, desc)
        main.appendChild(video)

        video.addEventListener("click", () => {

        iframe.setAttribute("src", `https://www.youtube.com/embed/${e.id.videoId}`)
        iframe.setAttribute("height", "300")

    })
})
}












window.addEventListener("load", fetchData)
btn.addEventListener("click", fetchData)


