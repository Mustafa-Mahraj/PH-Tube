function getTime(time) {
    const hour = parseInt(time / 3600);
    let remainingSec = time % 60;
    const minute = parseInt(remainingSec / 60);
    remainingSec = remainingSec % 60;
    return `${hour} hr ${minute} min ${remainingSec} Sec ago`
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for (const button of buttons) {
        button.classList.remove('active')
    }
}

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}
const loadVideos = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}
const loadCategoryVideos = (id) => {

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add('active');
            displayVideos(data.category);
        })
        .catch(error => console.log(error))
}
const loadDetails = async (videoId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    const data = await res.json()
    displayDetails(data.video)
}


// ************** Display Part ***********

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories')

    for (const item of categories) {

        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML =
            `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">${item.category} </button>
        `
        categoryContainer.append(buttonContainer)
    }
}


const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";
    if (videos.length == 0) {
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML =
            `
        <div class= "min-h-[300px]  flex flex-col gap-5 justify-center items-center">
        <img src= "assets/icon.png" />
        <h2 class="text-xl text-center font-bold">No Content here in this Category</h2>
        </div>
        `;
        return;
    }
    else {
        videoContainer.classList.add('grid')
    }

    for (const video of videos) {
        // console.log(video)
        const card = document.createElement('div')
        card.classList = 'card card-compact'
        card.innerHTML =
            `
       <figure class="h-[200px] relative">
    <img
      src= ${video.thumbnail}
      alt="Shoes" class="h-full w-full object-cover" />
      ${video.others.posted_date?.length == 0 ? "" : `<span class ="absolute right-2 bottom-2 bg-[#111111ad] text-white text-sm rounded py-1 px-2">${getTime(video.others.posted_date)}</span>`}
  </figure>
  <div class="px-1 py-3 flex gap-2 items-center">
    <div>
        <img class="h-10 w-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
    </div>
    <div>
       <h2 class="font-bold">${video.title}</h2>
       <div class="flex items-center gap-2">
       <p class="text-gray-400">${video.authors[0].profile_name} </p>

       ${video.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ''}
       </div>
       <div class="flex gap-12 items-center">
       <p class="text-gray-400">${video.others.views}</p>
       <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error mt-1">Details</button>
       </div>
    </div>
  </div>
       `
        videoContainer.append(card)
    }
}
const displayDetails = (details) => {
    console.log(details)
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = 
    `
    <img src="${details.thumbnail}" />
    <p>${details.description}</p>
    `

    document.getElementById('show-modal-btn').click();
}

document.getElementById('search-input').addEventListener('keyup', (e) => {
    loadVideos(e.target.value)
})
loadCategories();
loadVideos();