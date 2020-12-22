
const exerciseImageUrl = "https://wger.de/api/v2/exerciseimage/?is_main=True"
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
    option.value = `${muscle.id}`
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
  console.log(option)
  // getExercises(option)
}


// API call with dropdown value to retrieve matching exercises & info
// API call for matching exercise images
const getExercises = async (id) => {
  const exerciseUrl = `https://wger.de/api/v2/exercise/?muscle=${id}&language=2`
  try {
    const response = await axios.get(exerciseUrl)
    console.log(response.data.results)
    // const exerciseList = response.data.results
    // console.log(exerciseList)
  } catch (error) {
    console.log(error)
  }
}

// getExercises()

// Create tags dynamically & append to append exercises div




// Remove exercises from last search
