const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  console.log("Menu toggled"); // For debugging
});

const loadCategoriesPet = () => {
  //fetch the data
  fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((data) => {
      displayCard(data);
    })
    .catch((error) => console.log(error));
};

loadCategoriesPet();

const displayCard = (data) => {
  const vleftCardContainer = document.getElementById("leftCardContainer");
  // console.log("sheraj", data.pets);
  data.pets.forEach((pet) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add(
      "card",
      "bg-base-100",
      "shadow-xl",
      "h-[400px]",
      "rounded-lg", // Border radius (large)
      "border", // Adds a 1px border
      "border-gray-300", // Border color
      "p-4"
    ); // Applying classes to the card
    // cardactions.classList.add("border", "p-2");
    cardDiv.innerHTML = `<div class="card ">
              <figure>
                <img src="${pet.image}" alt="Shoes" class="mb-5 rounded-lg" />
              </figure>
              <div class="card-body gap-2 p-1 line-height-2   ">
                <h2 class="card-title font-semibold ">
                  ${pet.pet_name}
                  
                </h2>
                <p class="text-sm whitespace-normal">Breed:${
                  pet.breed || "Not Specified"
                }</p>
                 <p>Birth:${pet.date_of_birth || "Unknown"}</p>
                 <p>Gender:${pet.gender || "Unknown"}</p>
                 <p>Price:${pet.price || "Not Available"}</p>
                 </div>

              <div class="divider mt-0 mb-0"></div>
                <div class="card-actions  p-1 rounded-lg shadow-md flex justify-between ">
                  <div class="badge  rounded flex-none w-14" onclick="Like(${
                    pet.petId
                  })">Like</div>
                   <div class="badge rounded text-[#0e7a82]" onclick="adopt(${
                     pet.petId
                   })">Adopt</div>
                  <div class="badge rounded text-[#0e7a82]" onclick="details(${
                    pet.petId
                  })">Details</div>
                </div>
              </div>
            </div>`;

    // console.log("araf", pet.image);

    vleftCardContainer.appendChild(cardDiv);
  });
};

/*
{
    "petId": 17,
    "breed": "Maine Coon",
    "category": "Cat",
    "date_of_birth": "2022-12-01",
    "price": 1200,
    "image": "https://i.ibb.co.com/85w4kSt/pet-17.jpg",
    "gender": "Male",
    "pet_details": "This majestic male Maine Coon, born on December 1, 2022, is known for his gentle demeanor and friendly personality. Fully vaccinated and priced at $1200, he's great with families and other pets.",
    "vaccinated_status": "Fully",
    "pet_name": "Thor"
}
*/

function Like(petId) {
  // Fetch the pet data from the API using the provided petId
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => {
      // Assuming the data you need is in 'data.petData'
      if (data && data.petData) {
        // Clear the current content of the container before displaying new card
        displayRightSideCard(data.petData);
      } else {
        console.error("Pet data not found in API response", data);
      }
    })
    .catch((error) => console.log("Error fetching pet data:", error));
}

// Function to display the selected pet card
function displayRightSideCard(pet) {
  const vrightSideDiv = document.getElementById("rightSideDiv");
  // Create an image element
  const imageElement = document.createElement("img");
  imageElement.src = pet.image;
  imageElement.alt = pet.pet_name || "Pet Image"; // Use the pet's name for alt text
  imageElement.className = "w-full h-auto"; // Applying Tailwind CSS classes

  vrightSideDiv.appendChild(imageElement);
}

const details = async (petId) => {
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(url);
  const data = await res.json();

  DisplayDetails(data.petData);
};

const DisplayDetails = (petData) => {
  console.log("20200", petData);
  const detailsContainer = document.getElementById("modal-content");

  detailsContainer.innerHTML = `
  <img src= ${petData.image}/>
  <p>${petData.pet_name}</p>
  
  `;
  // first way
  // document.getElementById("showModalData").click();
  // second way
  document.getElementById("customModal").showModal();
};

function adopt(petId) {
  const modal = document.getElementById("CountDrownModal");
  const modalcontentCount = document.getElementById("modal-contentCount");

  let countdown = 3; // Start with 3 seconds
  modalcontentCount.innerHTML = countdown; // Show the initial countdown value

  // Show the modal
  modal.showModal();

  // Create a countdown using setInterval
  const intervalId = setInterval(() => {
    countdown--; // Decrease the countdown by 1 each second
    modalcontentCount.innerHTML = countdown; // Update the modal content with the new countdown value

    if (countdown === 0) {
      // When the countdown reaches 0, clear the interval and close the modal
      clearInterval(intervalId);
      modal.close(); // Close the modal after 3 seconds
    }
  }, 1000); // Update every 1 second (1000ms)
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  // console.log(buttons);
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};
const loadCategories = () => {
  //fetch the data
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// Display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");

  // add Data in html
  categories.forEach((item) => {
    // create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.id}" onclick="loadCategoriesVideos('${item.category}')" class="btn category-btn">
    ${item.category}
    </button>
    `;

    // button.classList = "btn";

    // button.innerText = item.category;
    categoriesContainer.append(buttonContainer);
  });
};

const loadCategoriesVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`) // Replace with your actual API URL
    .then((res) => res.json())
    .then((response) => {
      // Check if the response indicates success and contains the data array
      if (response.status && Array.isArray(response.data)) {
        displayLeftSideCards(response.data); // Pass the array of pets directly
      } else {
        console.error("Failed to fetch pets data:", response.message);
      }
    })
    .catch((error) => console.error("Fetch error:", error));
};
const displayVideos = (data) => {
  const vleftCardContainer = document.getElementById("leftCardContainer");

  // Check if vleftCardContainer exists
  if (!vleftCardContainer) {
    console.error("leftCardContainer not found");
    return;
  }

  // Clear any existing content in vleftCardContainer
  vleftCardContainer.innerHTML = "";
  // sobaike active class remove korao
  removeActiveClass();
  // id er class k active korao
  const activeBtn = document.getElementById(`btn-${id}`);
  activeBtn.classList.add("active");

  // Log the data to make sure it's correct
  console.log("Pets data:", data);

  // Loop through the data and create cards for each pet
  data.forEach((pet) => {
    const cardDiv = document.createElement("div");

    cardDiv.classList.add(
      "card",
      "bg-base-100",
      "shadow-xl",
      "h-[400px]",
      "rounded-lg", // Border radius (large)
      "border", // Adds a 1px border
      "border-gray-300", // Border color
      "p-4"
    ); // Applying classes to the card
    cardDiv.innerHTML = `<div class="card ">
    <figure>
      <img src="${pet.image}" alt="Shoes" class="mb-5 rounded-lg" />
    </figure>
    <div class="card-body gap-2 p-1 line-height-2   ">
      <h2 class="card-title font-semibold ">
        ${pet.pet_name}
        
      </h2>
      <p class="text-sm whitespace-normal">Breed:${
        pet.breed || "Not Specified"
      }</p>
       <p>Birth:${pet.date_of_birth || "Unknown"}</p>
       <p>Gender:${pet.gender || "Unknown"}</p>
       <p>Price:${pet.price || "Not Available"}</p>
       </div>

    <div class="divider mt-0 mb-0"></div>
      <div class="card-actions  p-1 rounded-lg shadow-md flex justify-between ">
        <div class="badge  rounded flex-none w-14" onclick="Like(${
          pet.petId
        })">Like</div>
         <div class="badge rounded text-[#0e7a82]" onclick="adopt(${
           pet.petId
         })">Adopt</div>
        <div class="badge rounded text-[#0e7a82]" onclick="details(${
          pet.petId
        })">Details</div>
      </div>
    </div>
  </div>`;

    // Append the cardDiv to the left card container
    vleftCardContainer.appendChild(cardDiv);
  });
};

function displayLeftSideCards(data) {
  const vleftCardContainer = document.getElementById("leftCardContainer");

  // Check if vleftCardContainer exists
  if (!vleftCardContainer) {
    console.error("leftCardContainer not found");
    return;
  }

  // Check if data is an array
  if (!Array.isArray(data)) {
    console.error("Expected an array of pets, but got:", data);
    return;
  }

  // Clear any existing content in vleftCardContainer
  vleftCardContainer.innerHTML = "";

  if (data.length == 0) {
    vleftCardContainer.classList.remove("grid");
    vleftCardContainer.innerHTML = `
    <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
  <img
      src="./design/error.png"
      alt="Shoes"/>
      <h2 class="text-center text-xl font-bold">No Content Here in this Category</h2>
    </div>
    `;
    return;
  } else {
    vleftCardContainer.classList.add("grid");
  }

  data.forEach((pet) => {
    const cardDiv = document.createElement("div");

    cardDiv.classList.add(
      "card",
      "bg-base-100",
      "shadow-xl",
      "h-[400px]",
      "rounded-lg", // Border radius (large)
      "border", // Adds a 1px border
      "border-gray-300", // Border color
      "p-4"
    ); // Applying classes to the card
    cardDiv.innerHTML = `<div class="card ">
    <figure>
      <img src="${pet.image}" alt="Shoes" class="mb-5 rounded-lg" />
    </figure>
    <div class="card-body gap-2 p-1 line-height-2   ">
      <h2 class="card-title font-semibold ">
        ${pet.pet_name}
        
      </h2>
      <p class="text-sm whitespace-normal">Breed:${
        pet.breed || "Not Specified"
      }</p>
       <p>Birth:${pet.date_of_birth || "Unknown"}</p>
       <p>Gender:${pet.gender || "Unknown"}</p>
       <p>Price:${pet.price || "Not Available"}</p>
       </div>

    <div class="divider mt-0 mb-0"></div>
      <div class="card-actions  p-1 rounded-lg shadow-md flex justify-between ">
        <div  id="btn-${
          pet.petId
        }" class="badge  rounded flex-none w-14" onclick="Like(${
      pet.petId
    })">Like</div>
         <div id="btn-${
           pet.petId
         }" class="badge rounded text-[#0e7a82]" onclick="adopt(${
      pet.petId
    })">Adopt</div>
        <div id="btn-${
          pet.petId
        }" class="badge rounded text-[#0e7a82]" onclick="details(${
      pet.petId
    })">Details</div>
      </div>
    </div>
  </div>`;

    // Append the cardDiv to the left card container
    vleftCardContainer.appendChild(cardDiv);
  });
}

loadCategories();

document.getElementById("btnsortBy").addEventListener("click", function () {
  //fetch the data
  fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((data) => {
      sortPets(data.pets);
    })
    .catch((error) => console.log(error));
});
let isAscending = true; // Variable to track sorting order
function sortPets(pets) {
  // Sort the pets array based on the current order
  pets.sort((a, b) => (isAscending ? a.price - b.price : b.price - a.price));

  // Toggle the sorting order for the next click
  isAscending = !isAscending;

  const vleftCardContainer = document.getElementById("leftCardContainer");

  // Check if vleftCardContainer exists
  if (!vleftCardContainer) {
    console.error("leftCardContainer not found");
    return;
  }

  // Check if data is an array
  if (!Array.isArray(pets)) {
    console.error("Expected an array of pets, but got:", pets);
    return;
  }

  // Clear any existing content in vleftCardContainer
  vleftCardContainer.innerHTML = "";

  if (pets.length == 0) {
    vleftCardContainer.classList.remove("grid");
    vleftCardContainer.innerHTML = `
    <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
  <img
      src=user.png
      alt="Shoes"/>
      <h2 class="text-center text-xl font-bold">No Content Here in this Category</h2>
    </div>
    `;
    return;
  } else {
    vleftCardContainer.classList.add("grid");
  }

  // Log the data to make sure it's correct
  console.log("Pets data:", pets);

  // Loop through the data and create cards for each pet
  pets.forEach((pet) => {
    const cardDiv = document.createElement("div");

    cardDiv.classList.add(
      "card",
      "bg-base-100",
      "shadow-xl",
      "h-[400px]",
      "rounded-lg", // Border radius (large)
      "border", // Adds a 1px border
      "border-gray-300", // Border color
      "p-4"
    ); // Applying classes to the card
    cardDiv.innerHTML = `<div class="card ">
    <figure>
      <img src="${pet.image}" alt="Shoes" class="mb-5 rounded-lg" />
    </figure>
    <div class="card-body gap-2 p-1 line-height-2   ">
      <h2 class="card-title font-semibold ">
        ${pet.pet_name}
        
      </h2>
      <p class="text-sm whitespace-normal">Breed:${
        pet.breed || "Not Specified"
      }</p>
       <p>Birth:${pet.date_of_birth || "Unknown"}</p>
       <p>Gender:${pet.gender || "Unknown"}</p>
       <p>Price:${pet.price || "Not Available"}</p>
       </div>

    <div class="divider mt-0 mb-0"></div>
      <div class="card-actions  p-1 rounded-lg shadow-md flex justify-between ">
        <div class="badge  rounded flex-none w-14" onclick="Like(${
          pet.petId
        })">Like</div>
         <div class="badge rounded text-[#0e7a82]" onclick="adopt(${
           pet.petId
         })">Adopt</div>
        <div class="badge rounded text-[#0e7a82]" onclick="details(${
          pet.petId
        })">Details</div>
      </div>
    </div>
  </div>`;

    // Append the cardDiv to the left card container
    vleftCardContainer.appendChild(cardDiv);
  });
}
