const btnContainer = document.getElementById('btn-container')
const cardContainer = document.getElementById('card-container')

let selectedCatagory = 1000;

const fetchCategories = async() =>{
   const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
   const data = await res.json();
    const menus = data.data;
    displayMenu(menus);
}

const displayMenu = (menus) =>{
    menus.forEach(card =>{
        // console.log(card)
        const newButton = document.createElement('button')
        newButton.className = 'btn bg-slate-900 text-white'
        newButton.innerText = card.category;
        newButton.addEventListener('click', () => fetchDataCatagories(card.
            category_id))
        btnContainer.appendChild(newButton)
    })

}

const fetchDataCatagories = async(catagoryID) =>{
    // console.log(catagoryID)
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catagoryID}`);
    const data = await res.json();
    // console.log(data.data)
    const singlePart = data.data;
    showSingleDataCard(singlePart)
}

const showSingleDataCard = (allData) =>{
    // console.log(allData)
    cardContainer.innerHTML= ''
    allData.forEach(singleData =>{
        console.log(singleData)
        let verifiedBadge = ''
        if(singleData.authors[0].verified){
          verifiedBadge = `  <img class="w-6 h-6" src="./png-transparent-verified.png" alt="">`
        }
        const newCard = document.createElement('div')
    newCard.innerHTML = `
    <div class="card w-full bg-base-100 shadow-xl">
    <figure class="overflow-hidden h-72">
        <img class="w-full" src="${singleData.thumbnail}" alt="Shoes" />
        <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
    </figure>
    <div class="card-body">
        <div class="flex space-x-4 justify-start items-start">
            <div>
                <img class="w-12 h-12 rounded-full" src="${singleData.authors[0].profile_picture}" alt="Shoes" />
            </div>
            <div>
                <h2 class="card-title">${singleData.title}</h2>
                <div class="flex mt-3">
                    <p class="">${singleData.authors[0].profile_name}</p>
                   ${verifiedBadge}
                  
                </div>
                <p class="mt-3">${singleData.others.views}</p>
            </div>
        </div>
    </div>
</div>
 `;
 cardContainer.appendChild(newCard)
    })
//   authors

}


fetchCategories()
fetchDataCatagories(selectedCatagory)