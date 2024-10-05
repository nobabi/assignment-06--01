// console.log("hello");
// 1- Fetch, Load and show Categories on html
// create loadCategories
// Create displayCategories
// create loadCategories

const loadCategories = () => {
  //fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

//https://openapi.programming-hero.com/api/phero-tube/category/1003

// Display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  // add Data in html
  categories.forEach((item) => {
    // create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class="btn category-btn">
    ${item.category}
    </button>
    `;

    // button.classList = "btn";

    // button.innerText = item.category;
    categoriesContainer.append(buttonContainer);
  });
};

const loadCategoriesVideos = (id) => {
  //fetch the data
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // sobaike active class remove korao
      removeActiveClass();
      // id er class k active korao
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      // console.log(activeBtn);
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};
// Display categories
const loadVideos = (searchText = "") => {
  //fetch the data
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const loadDetails = async (vidoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${vidoId}`;
  const res = await fetch(url);
  const data = await res.json();
  DisplayDetails(data.video);
};

const DisplayDetails = (video) => {
  const detailsContainer = document.getElementById("modal-content");

  detailsContainer.innerHTML = `
  <img src= ${video.thumbnail}/>
  <p>${video.description}</p>
  
  `;
  // first way
  // document.getElementById("showModalData").click();
  // second way
  document.getElementById("customModal").showModal();
};
function getTimeString(time) {
  // Get hours, minutes, and remaining seconds
  const hour = Math.floor(time / 3600);
  let remainingSecond = time % 3600;
  const minute = Math.floor(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;

  // Handle pluralization
  const hourString = hour === 1 ? `${hour} hour` : `${hour} hours`;
  const minuteString = minute === 1 ? `${minute} minute` : `${minute} minutes`;
  const secondString =
    remainingSecond === 1
      ? `${remainingSecond} second`
      : `${remainingSecond} seconds`;

  // Return formatted string
  return `${hourString}, ${minuteString}, and ${secondString} ago`;
}
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  // console.log(buttons);
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = "";

  if (videos.length == 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
    <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
  <img
      src=Icon.png
      alt="Shoes"/>
      <h2 class="text-center text-xl font-bold">No Content Here in this Category</h2>
    </div>
    `;
    return;
  } else {
    videosContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    // console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact  w-96";
    card.innerHTML = `
     <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      alt="Shoes" class="h-full w-full object-cover"/>
      ${
        video.others.posted_date?.length == 0
          ? ""
          : ` <span class="absolute right-2 text-xs bottom-2 bg-black text-white rounded p-1">${getTimeString(
              video.others.posted_date
            )}</span>
`
      }
     
  </figure>
  <div class="px-0 py-2 flex gap-2">

    <div>
    <img
      src=${video.authors[0].profile_picture}
      alt="Shoes" class="h-10 w-10 rounded-full object-cover"/>

    </div>

    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-2">
     <p class="text-gray-400">${video.authors[0].profile_name}</p>
     ${
       video.authors[0].verified == true
         ? `<img class="w-5"
      src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />`
         : " "
     }
    
  
   
    </div>
    <p>${video.others.views} </p>
    
    <p>
    <button onclick="loadDetails('${
      video.video_id
    }')" class="btn btn-sm btn-error">Details</button>
    </p>
    </div>
  </div>
    `;
    videosContainer.appendChild(card);
  });
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
  loadVideos(e.target.value);
});
loadCategories();
loadVideos();
