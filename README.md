# Project Overview

## Get Fit

## Project Description

The Get Fit site will allow you to search by muscle for exercises for that muscle with pictures and a discription of how to perform that exercise

## API and Data Sample

This site will use the workout API https://wger.de/en/software/api
Muscle data sample:

```
{
    "name": "Quadriceps femoris",
    "is_front": true,
    "image_url_main": "/static/images/muscles/main/muscle-10.svg",
    "image_url_secondary": "/static/images/muscles/secondary/muscle-10.svg"
},
{
    "name": "Serratus anterior",
    "is_front": true,
    "image_url_main": "/static/images/muscles/main/muscle-3.svg",
    "image_url_secondary": "/static/images/muscles/secondary/muscle-3.svg"
}
```

## Wireframes

![Wireframe](https://res.cloudinary.com/doas1ztbf/image/upload/v1609443694/Screen_Shot_2020-12-31_at_2.40.55_PM_v3fjhz.png)

### MVP/PostMVP

#### MVP

- Using the workout API, allow users to search by muscle dropdown
- Return top 20 exercises that apply to that muscle
- Each exercise should include title, image, and description

#### PostMVP

- Add workout section that allows users to add exercises to their workout
- Find a second API with links to exercise videos
- Toggle between search by muscle and search by exercise

## Project Schedule

| Day    | Deliverable                                        | Status     |
| ------ | -------------------------------------------------- | ---------- |
| Dec 18 | Prompt / Wireframes / Priority Matrix / Timeframes | Complete   |
| Dec 21 | Project Approval                                   | Complete   |
| Dec 22 | Core Application Structure (HTML, CSS, etc.)       | Complete   |
| Dec 23 | Pseudocode / actual code                           | Complete   |
| Jan 4  | MVP                                                | Complete   |
| Jan 5  | Presentations                                      | Incomplete |

## Priority Matrix

![Priority Matrix](https://res.cloudinary.com/doas1ztbf/image/upload/v1608503581/Priority%20Matrix.png)

## Timeframes

| Component                               | Priority | Estimated Time | Time Invested | Actual Time |
| --------------------------------------- | :------: | :------------: | :-----------: | :---------: |
| 2 Sucessful API Calls with axios        |    H     |      2hrs      |     2hrs      |    2hrs     |
| Basic HTML including Forms              |    H     |      2hrs      |     2hrs      |    2hrs     |
| Pseudocode js outline                   |    H     |      2hrs      |     2hrs      |    2hrs     |
| Build out js for dropdown               |    H     |      3hrs      |     4hrs      |    4hrs     |
| Build out js for search results         |    H     |      3hrs      |     4hrs      |    4hrs     |
| Basic CSS layout                        |    M     |      3hrs      |     3hrs      |    3hrs     |
| HTML touchups                           |    L     |      1hr       |     1hrs      |    1hrs     |
| Filter search results by dropdown entry |    H     |      3hrs      |     4hrs      |    4hrs     |
| Remove results from previous search     |    M     |      3hrs      |     3hrs      |    3hrs     |
| CSS design for mobile                   |    M     |      3hrs      |     3hrs      |    3hrs     |
| CSS design for desktop                  |    M     |      3hrs      |     3hrs      |    3hrs     |
| Clear search fields after searching     |    L     |      2hr       |     2hrs      |    2hrs     |
| Total                                   |    H     |     30hrs      |     33hrs     |    33hrs    |

## Code Snippet

```
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
```

## Change Log

- Due to missing images in Exercise API endpoint, added in image randomizer (from array of 5 images) to display a random image when image is missing from the endpont
- ID was missing from muscle endpoint, used regular expression to split string from image URL to grab the ID
- Exercise Images were missing from Exercise API endpoint, added 3rd API call to 3rd endpoint to grab image URLs
- Due to pagination in API, top 20 exercises will return automatically. For post-MVP could add pagination to results
