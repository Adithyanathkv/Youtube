
let container = document.querySelector("#contents")

//async function to display popular page
const popular = async()=>{
    try{
let res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&key=AIzaSyDguctRw1QIlnMRN09stQrNsRrNfsfUZvM`)
let data = await res.json()
    const dataArray = data.items
    displaydata(dataArray)
    console.log('dataArray:', dataArray)
    }
    catch(error){
    console.log('error:', error)
    }
}
popular()

//display function for popular data
var displaydata=(data)=>{
container.innerHTML=null;
data.map((ele)=>{

    let div = create("div")

     let image= create("img")
     image.src=ele.snippet.thumbnails.high.url
     image.width
     image.addEventListener("click",()=>{
        Video(ele)
     })

     let name = create("h4")
     name.innerText = ele.snippet.title

     let channel= create("p")
     channel.innerText=ele.snippet.channelTitle

    div.append(image,name,channel)
    container.append(div)
})
}



//function to get video by search

const getVideo=async()=>{
    let inp = document.getElementById("search").value
    try{
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${inp}&key=AIzaSyDguctRw1QIlnMRN09stQrNsRrNfsfUZvM&maxResults=20`);
        let data = await res.json()
        console.log('data:', data)
        let DataArray = data.items
        console.log('dataArray:', DataArray)
        displaydata(DataArray)
    }
    catch(error){
        console.log('error:', error)

    }

}

//function to display data of the searched value

var displaydata=(DataArray)=>{
    container.innerHTML=null;
    DataArray.map((ele)=>{
    
        let div = create("div")
    
         let image= create("img")
         image.src=ele.snippet.thumbnails.high.url
         image.width
         image.addEventListener("click",()=>{
            localStorage.setItem(`${ele.snippet.title}`,JSON.stringify(commentArray))
            Video(ele)
         })
    
         let name = create("h4")
         name.innerText = ele.snippet.title
    
         let channel= create("p")
         channel.innerText=ele.snippet.channelTitle
    
        div.append(image,name,channel)
        container.append(div)
    })
    }

//storing empty array for comment in local storage
    let commentArray =[]
const Video=(ele)=>{
    console.log(ele)
let videoArray=[];


//pushing details to local storage
videoArray.push(ele)
localStorage.setItem("video",JSON.stringify(videoArray))
let inp = document.getElementById("search").value
localStorage.setItem("name",JSON.stringify(inp))
window.location.href="videopage.html"
}



//function to create elements
const create =(item)=>{ return document.createElement(item)}


//function for displaying and removing the filterbar

let i=1
document.getElementById("filters1").style.display="none"
document.getElementById("menu").addEventListener("click",()=>{
    console.log("hello")
    let section1=document.getElementById("filters1")
    let section2= document.getElementById("filters")
    if(i%2!=0){
        section1.style.display="none"
        section2.style.display="block"
        document.getElementById("readylinks").style.maxWidth="100%"
        document.getElementById("contentcontainer").style.maxWidth="100%"
    }
    if(i%2==0){
        section1.style.display="block"
        section2.style.display="none"
        document.getElementById("contentcontainer").style.maxWidth="1346px"
        document.getElementById("readylinks").style.maxWidth="1346px"
    }
    i++
})
