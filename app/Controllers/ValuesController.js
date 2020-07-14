import _carsService from '../Services/CarsService.js'
import _store from '../store.js'
import store from '../store.js';

// we need a blank template
// we need the cars
// we need the element to inject into
function _draw() {
  let template = ""
  console.log("draw ran");
  let cars = _store.State.cars
  // NOTE sorts cars by their price. this custom sort expects either a positive or a negative to either move the item up or down in the array 
  cars.sort((a, b) => b.price - a.price)
  cars.forEach(car => template += car.Template)
  document.getElementById("cars").innerHTML = template
}

export default class CarsController {
  constructor() {
    console.log("Hello from cars controller");
    store.subscribe("cars", _draw)
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