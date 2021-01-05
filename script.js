
// Use axios API call to create dynamic dropdown list of muscles
const muscleUrl = "https://wger.de/api/v2/muscle"

const getOptions = async () => {
  try {
    const response = await axios.get(muscleUrl)
    const muscleList = response.data.results
    muscleOptions(muscleList)
  } catch (error) {
    console.log(error)
  }
}
getOptions()

// Create option tags dynamically from dropdown list return & append to select
function muscleOptions(muscleList) {
  const select = document.querySelector('#select-muscle')
  return muscleList.forEach((muscle) => {
    const option = document.createElement('option')
    let whole_string= muscle.image_url_main
    let split_string = whole_string.split(/(\d+)/)
    let id = split_string[1]
    option.value = `${id}`
    option.textContent = `${muscle.name}`
    select.append(option)
  })
}


// Create form event handler
const form = document.querySelector('#muscle-search')
form.addEventListener('submit', getSelection)


// Get value selected from dropdown upon submit
function getSelection(e) {
  e.preventDefault()
  const option = document.querySelector('#select-muscle').value
  getExercises(option)
}



// API call with dropdown value to retrieve matching exercises & info
const getExercises = async (id) => {
  const exerciseUrl = `https://wger.de/api/v2/exercise/?muscles=${id}&language=2`
  try {
    const response = await axios.get(exerciseUrl)
    const exerciseList = response.data.results
    removeExercises()
    showExerciseInfo(exerciseList)
  } catch (error) {
    console.log(error)
  }
}


// API call for matching exercise images
async function getImage(id) {
  const exerciseImageUrl = `https://wger.de/api/v2/exerciseimage/?is_main=True&exercise=${id}`
  try {
    const response = await axios.get(exerciseImageUrl)
    return exerciseImage = response.data.results[0].image
  } catch (error) {
    console.log(error)
    const randImg = [
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fHdvcmtvdXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fHdvcmtvdXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1524002232583-bbe9d9d2eebd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzZ8fHdvcmtvdXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1516481157630-05bc0aeb8b19?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTAyfHx3b3Jrb3V0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1584827387179-355517d8a5fb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQ5fHx3b3Jrb3V0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    ]
    return exerciseImage = randImg[Math.floor(Math.random()*randImg.length)]
  }
}



// Create tags dynamically & append to append exercises div
function showExerciseInfo(data) {
  data.forEach(async (exercise) => {
    let exerciseImage = await getImage(exercise.id)
    const exerciseInfo = `
    <h2>${exercise.name}</h2>
    <img src=${exerciseImage} alt="exercise" class="exercise"/>
    <p>${exercise.description}</p>
    `
    document.querySelector('#append-exercises').insertAdjacentHTML('beforeend', exerciseInfo)
    })
  }
    


// Remove exercises from last search
function removeExercises() {
  const removeExercise = document.querySelector('#append-exercises')
  while (removeExercise.lastChild) {
    removeExercise.removeChild(removeExercise.lastChild)
  }
}