let videoArray = JSON.parse(localStorage.getItem("video"));
let videoObj = videoArray[0];

console.log("videoObj:", videoObj);


const displaydata = () => {
  let iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${videoObj.id.videoId}`;

  let Title = document.createElement("h3");
  Title.innerText = videoObj.snippet.title;

  document.getElementById("videocontainer").append(iframe, Title);

  let thumb = document.createElement("img");
  thumb.src = videoObj.snippet.thumbnails.high.url;

  let channel = document.createElement("h5");
  channel.innerText = videoObj.snippet.channelTitle;

  let btn1 = document.createElement("button");
  btn1.innerText = "JOIN";
  btn1.id = "join";
  let btn2 = document.createElement("button");
  btn2.innerText = "SUBSCRIBE";

  document.getElementById("description").append(thumb, channel, btn1, btn2);
};
displaydata();

const getVideo = async () => {
  let inp = JSON.parse(localStorage.getItem("name"));
  console.log('inp:', inp)
  try {
    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${inp}&key=AIzaSyDguctRw1QIlnMRN09stQrNsRrNfsfUZvM&maxResults=20`
    );
    let data = await res.json();
    console.log("data:", data);
    let DataArray = data.items;
    console.log("dataArray:", DataArray);
    displaydata2(DataArray);
  } catch (error) {
    console.log("error:", error);
  }
};
getVideo();

const displaydata2 = (DataArray) => {
  let inp = JSON.parse(localStorage.getItem("name"));
  console.log('inp:', inp)
  DataArray.map(({snippet:{title,channelTitle}}) => {
    
    let div = document.createElement("div");

    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${channelTitle}`;
    iframe.width = "168px";
    iframe.height = "94px";
    let detailsdiv = document.createElement("div");

    let Title = document.createElement("h4");
    Title.innerText = title;
    let channel = document.createElement("p");
    channel.innerText = channelTitle
    
    detailsdiv.append(Title,channel);
    div.append(iframe, detailsdiv);
    document.getElementById("othervideo").append(div);
  });
};


let commentArray= JSON.parse(localStorage.getItem(`videoObj.snippet.title${videoObj.snippet.title}`))||[]


const add = ()=>{
  let commentInput = document.getElementById("addcomments").value
  console.log('commentInput:', commentInput)
  commentArray.push(commentInput)
  console.log('commentArray:', commentArray)
  localStorage.setItem(`videoObj.snippet.title${videoObj.snippet.title}`,JSON.stringify(commentArray))
  displaydata3(commentArray)
}
displaydata3(commentArray)
function displaydata3(commentArray)
{
    
    document.querySelector("#showComments").innerHTML=""
  
    
    commentArray.map((ele)=>{
      
      let div = document.createElement("div")
      
      let image = document.createElement("img")
      image.src = "./images/unnamed.jpg"
      let P =document.createElement("p")
      P.innerText = ele
      
      div.append(image,P)
 
  
      document.querySelector("#showComments").append(div)
    })
  
  
  
  
}


