import _carsService from '../Services/CarsService.js'
import _store from '../store.js'
import store from '../store.js';

// we need a blank template
// we need the cars
// we need the element to inject into
function _draw() {
  let template = `<div id="form" class="row justify-content-center pb-5">
    <div class="col-12 text-center">
      <h5>Make a car!</h5>
    </div>
    <form onsubmit="app.carsController.addCar(event)" class="col-8">
      <div class="form-group">
        <label for="make">Make</label>
        <input type="text" name="make" class="form-control" placeholder="Enter Make...">
                </div>
        <div class="form-group">
          <label for="model">Model</label>
          <input type="text" name="model" class="form-control" placeholder="Enter Model...">
                </div>
          <div class="form-group">
            <label for="year">Year</label>
            <input type="number" min="1900" max="2020" name="year" class="form-control"
              placeholder="Enter Year...">
                </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input type="number" min="0" name="price" class="form-control" placeholder="Enter Price...">
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
              <div id="cars" class="row">`
  console.log("draw ran");
  let cars = _store.State.cars
  // NOTE sorts cars by their price. this custom sort expects either a positive or a negative to either move the item up or down in the array 
  cars.sort((a, b) => b.price - a.price)
  cars.forEach(car => template += car.Template)
  template += `</div></main>`
  document.getElementById("items").innerHTML = template
}

export default class CarsController {
  constructor() {
    console.log("Hello from cars controller");
    store.subscribe("cars", _draw)
  }

  loadCars() {
    _draw()
  }
  addCar(event) {
    event.preventDefault();
    let formData = event.target
    console.log("it happened", formData.make.value);
    let rawCarData = {
      make: formData.make.value,
      model: formData.model.value,
      year: formData.year.value,
      price: formData.price.value,
      imgUrl: formData.imgUrl.value,
      description: formData.description.value,
    }
    _carsService.addCar(rawCarData)
    formData.reset()
  }

  deleteCar(carId) {
    _carsService.deleteCar(carId)
  }

  bidOnCar(carId) {
    _carsService.bidOnCar(carId)
  }

  // NOTE you can use this for an on click to draw the car form and then get the cars triggering the draw car method from our listeners
  // getCars() {
  //     _drawCarForm()
  //     _carsService.getCars()
  // }
}