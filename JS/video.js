const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories')

    for (const item of categories) {

        const button = document.createElement('button')
        button.classList = ('btn')
        button.innerText = item.category;

        categoryContainer.append(button)
    }
}


const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    for (const video of videos) {
        console.log(video)
        const card = document.createElement('div')
        card.classList = 'card card-compact'
        card.innerHTML =
            `
       <figure class="h-[200px] relative">
    <img
      src= ${video.thumbnail}
      alt="Shoes" class="h-full w-full object-cover" />
      <span class ="absolute right-2 bottom-2 bg-black text-white rounded py-1 px-2">${video.others.posted_date}</span>
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
       <p class="text-gray-400">${video.others.views}</p>
    </div>
  </div>
       `
        videoContainer.append(card)
    }
}

loadCategories();
loadVideos();