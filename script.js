

const muscleUrl = "https://wger.de/api/v2/muscle"


// Use axios API call to create dynamic dropdown list of muscles
const getOptions = async () => {
  try {
    const response = await axios.get(muscleUrl)
    // console.log(response.data.results)
    const muscleList = response.data.results
    // console.log(muscleList)
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
    // console.log(muscle.name)
    let whole_string= muscle.image_url_main
    let split_string = whole_string.split(/(\d+)/)
    let id = split_string[1]
    // console.log(id)
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
  // console.log(option)
  getExercises(option)
}


// API call with dropdown value to retrieve matching exercises & info
const getExercises = async (id) => {
  const exerciseUrl = `https://wger.de/api/v2/exercise/?muscles=${id}&language=2`
  try {
    const response = await axios.get(exerciseUrl)
    // console.log(response.data.results)
    const exerciseList = response.data.results
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
    console.log(response.data.results[0].image)
    return exerciseImage = response.data.results[0].image
  } catch (error) {
    console.log(error)
  }
}

// Create tags dynamically & append to append exercises div
function showExerciseInfo(data) {
  data.forEach(async (exercise) => {
    let exerciseImage = await getImage(exercise.id)
    let realImage = exerciseImage ? exerciseImage : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.G4HyFZUekuQ8Lilq1DcqTwHaHa%26pid%3DApi&f=1"
    console.log(realImage)
    const exerciseInfo = `
    <h3>${exercise.name}</h3>
    <img src=${realImage} alt="exercise" class="exercise"/>
    <p>${exercise.description}</p>
    `
    document.querySelector('#append-exercises').insertAdjacentHTML('beforeend', exerciseInfo)
    })
  }
    



// Remove exercises from last search
