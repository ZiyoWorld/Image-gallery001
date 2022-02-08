//563492ad6f91700001000001dec0a8145f444f88976d87624f7842c6

const auth = "563492ad6f91700001000001dec0a8145f444f88976d87624f7842c6";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let fetchLink;
let searchValue;
let page = 1;

const more = document.querySelector(".nav-button");
let currentSearch;


//Fetch API

async function fetchApi(url) {
     const dataFetch = await fetch(url, {
          method: "GET",
          headers: {
               Accept: "application/json",
               Authorization: auth,
          },

     });
     const data = await dataFetch.json();
     return data;
}

// EventListener
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit",  (e)=>{
     e.preventDefault();
     currentSearch = searchValue;
     searchPhotos(searchValue); 
})

function updateInput(e){
     searchValue = e.target.value;   
}

more.addEventListener("click", loadMore)



function generetedPictures(data){
     data.photos.forEach( (photo) => {
          const galleryImg = document.createElement("gallery-img");
          galleryImg.classList.add("gallery-img");
          galleryImg.innerHTML = 
          `
          <div class="gallery-info">
          <p>${photo.photographer}</p>
          <a href="${photo.src.large}" target="_blank">Download</a>
          </div>
          <img src="${photo.src.large}"></img>
          `
          gallery.appendChild(galleryImg);
     });
}

async function curatedPhotos(){
     fetchLink =  "https://api.pexels.com/v1/curated?per_page=15&page=1";
     const data = await fetchApi(fetchLink);
     generetedPictures(data);
}
curatedPhotos();

//Search functions

function clear(){
     gallery.innerHTML = "";
     searchInput.innerHTML = "";
}

async function searchPhotos(query){
   
      clear();
      fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
      const data =  await fetchApi(fetchLink);
      generetedPictures(data);


}

//load more 
async function loadMore(){
     page++;
     if(currentSearch){
          fetchLink =  `https://api.pexels.com/v1/search?query=${curatedPhotos}+query&per_page=15&page=${page}`;    
     } else{
          fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
     }
     const data = await fetchApi(fetchLink);
     generetedPictures(data);
}