/*
{
    "status": true,
    "message": "successfully fetched all the categories",
    "categories": [
        {
            "category_id": "1001",
            "category": "Music"
        },
        {
            "category_id": "1003",
            "category": "Comedy"
        },
        {
            "category_id": "1005",
            "category": "Drawing"
        }
    ]
}


*/

const loadCategories = () => {
  console.log("hellow");
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
  const categories = document.getElementById("categories");
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.categories;
    categories.ap;
  });
};

loadCategories();
displayCategories();
