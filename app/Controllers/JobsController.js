import _jobsService from '../Services/JobsService.js'
import _store from '../store.js'
import store from '../store.js';

// we need a blank template
// we need the cars
// we need the element to inject into
function _draw() {
  let template = `<div id="form" class="row justify-content-center pb-5">
    <div class="col-12 text-center">
        <h5>Post a job!</h5>
    </div>
    <form onsubmit="app.jobsController.addJob(event)" class="col-8">
        <div class="form-group">
            <label for="company">Company</label>
            <input type="text" name="company" class="form-control" placeholder="Enter Company...">
        </div>
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" name="title" class="form-control" placeholder="Enter Job Title...">
        </div>
        <div class="form-group">
            <label for="rate">Rate</label>
            <input type="number" min="0" name="rate" class="form-control" placeholder="Enter Hourly Wage...">
        </div>
        <div class="form-group">
            <label for="hours">Hours</label>
            <input type="number" min="0" name="hours" class="form-control" placeholder="Enter Hours per Week...">
        </div>
        <div class="form-group">
            <label for="imgUrl">Image Url</label>
            <input type="text" name="imgUrl" class="form-control" placeholder="Enter Image Url...">
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <input type="text" name="description" class="form-control" placeholder="Enter Description...">
        </div>
        <button class="btn btn-primary btn-block" type="submit">Submit</button>
    </form>
</div>
<div class="row">`
  console.log("draw ran");
  let jobs = _store.State.jobs
  // NOTE sorts cars by their price. this custom sort expects either a positive or a negative to either move the item up or down in the array 
  jobs.sort((a, b) => b.price - a.price)
  jobs.forEach(car => template += car.Template)
  template += `</div></main>`
  document.getElementById("items").innerHTML = template
}

export default class JobsController {
  constructor() {
    console.log("Hello from jobs controller");
    store.subscribe("jobs", _draw)
  }

  loadJobs() {
    _draw()
  }
  addJob(event) {
    event.preventDefault();
    let formData = event.target
    let rawJobData = {
      company: formData.company.value,
      jobTitle: formData.title.value,
      rate: formData.rate.value,
      hours: formData.hours.value,
      imgUrl: formData.imgUrl.value,
      description: formData.description.value,
    }
    _jobsService.addJob(rawJobData)
    formData.reset()
  }

  deleteCar(carId) {
    _jobsService.deleteJob(jobId)
  }

  bidOnCar(carId) {
    _jobsService.bidOnJob(jobId)
  }

  // NOTE you can use this for an on click to draw the car form and then get the cars triggering the draw car method from our listeners
  // getCars() {
  //     _drawCarForm()
  //     _carsService.getCars()
  // }
}