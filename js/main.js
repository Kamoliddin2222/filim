let elForm = document.querySelector("#form");
let elList = document.querySelector(".header__list")
let elGenerl = document.querySelector(".header__janer")
let elInput = document.querySelector("#input")
let elMadal = document.querySelector(".madal")
let elContent = document.querySelector(".content")
let elModalDickreption = document.querySelector(".modal__dickireption") 
let elButtonModal = document.querySelector(".button-madal")
let elModelLorem = document.querySelector(".madal__item-img")
let newTime = document.querySelector(".time")



function rederGenre(data, element){
     const resalt = [];

     data.forEach((film) =>{
          film.genres.forEach((genre) =>{
               if(!resalt.includes(genre)){
                    resalt.push(genre)
               }
          })
     })
     resalt.forEach((genre) => {
          const newOption = document.createElement("option")
          newOption.value = genre;
          newOption.textContent = genre

          element.appendChild(newOption)
     })
}
rederGenre(data, elGenerl )


function rendergeneresSelect (x, element){
     elList.innerHTML = null

     x.forEach(word =>{     
          let newLi = document.createElement("li")
          let newImg =document.createElement("img")
          let newHeding = document.createElement("h2")

   
          let newButton = document.createElement("button")
     
          newLi.setAttribute("class", "header__item")
          newImg.setAttribute("src", word.poster)
          newImg.setAttribute("class", "header__img")
          newImg.setAttribute("width", "230px");
          newImg.setAttribute("height", "200px");
          newHeding.setAttribute("class", "header__item-img")
       
     
          newHeding.textContent = word.title
          newButton.dataset.uuid = word.id
          newButton.textContent = "moree"

          
          newLi.appendChild(newImg)
          newLi.appendChild(newHeding)
          newLi.appendChild(newButton)
          elList.appendChild(newLi)

          newButton.addEventListener("click", (f) =>{
              let filmId = f.target.dataset.uuid
              let d =  x.find((f) => filmId == f.id)
              let ded = new Date(word.release_date);
              
              let year = ded.getUTCFullYear();
              let month = String(ded.getMonth()).padStart(2, "0");
              let day = ded.getDate();
              elModalDickreption.textContent = d.overview
              elModelLorem.textContent = d.title
              newTime.textContent = `${year}.${month}.${day}`
              elMadal.classList.add('madal--active')

          })
          elButtonModal.addEventListener("click", () =>{
              elMadal.classList.remove("madal--active")
          })
     })
}
rendergeneresSelect (data, elGenerl)


elForm.addEventListener("submit", (a) =>{
     a.preventDefault();

     let headerSelect = elGenerl.value.trim();
     
     let headerSearch = elInput.value.trim();

     let regex = new RegExp(headerSearch, 'gi')

     let searchFilms = data.filter((film)=> {
          return film.title.match(regex)
     })

     let kindom = []

     if(headerSelect == "All"){
          kindom = searchFilms
     }
     else{
          kindom = searchFilms.filter(film => {
               return film.genres.includes(headerSelect)
          })
     }
     rendergeneresSelect(kindom, elGenerl)
})
