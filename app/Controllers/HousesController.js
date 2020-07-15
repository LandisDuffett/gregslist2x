import _housesService from '../Services/HousesService.js'
import _store from '../store.js'
import store from '../store.js';

// we need a blank template
// we need the cars
// we need the element to inject into
function _draw() {
  let template = `<div id="form" class="row justify-content-center pb-5">
        <div class="col-12 text-center">
            <h5>Sell your house!</h5>
        </div>
        <form onsubmit="app.housesController.addHouse(event)" class="col-8">
            <div class="form-group">
                <label for="bedrooms">Bedrooms</label>
                <input type="text" name="bedrooms" class="form-control" placeholder="Enter Number of Bedrooms...">
            </div>
             <div class="form-group">
                <label for="bathrooms">Bathrooms</label>
                <input type="text" name="bathrooms" class="form-control" placeholder="Enter Number of Bathrooms...">
            </div>
            <div class="form-group">
                <label for="levels">Levels</label>
                <input type="text" name="levels" class="form-control" placeholder="Enter Number of Levels...">
            </div>
            <div class="form-group">
                <label for="year">Year</label>
                <input type="number" min="0" max="2020" name="year" class="form-control" placeholder="Enter Year Built...">
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
    <div class="row">`
  console.log("draw ran");
  let houses = _store.State.houses
  // NOTE sorts cars by their price. this custom sort expects either a positive or a negative to either move the item up or down in the array 
  houses.sort((a, b) => b.price - a.price)
  houses.forEach(house => template += house.Template)
  template += `</div></main>`
  document.getElementById("items").innerHTML = template
}

export default class HousesController {
  constructor() {
    console.log("Hello from houses controller");
    store.subscribe("houses", _draw)
  }

  loadHouses() {
    _draw()
  }
  addHouse(event) {
    event.preventDefault();
    let formData = event.target
    let rawHouseData = {
      bedrooms: formData.bedrooms.value,
      bathrooms: formData.bathrooms.value,
      levels: formData.levels.value,
      year: formData.year.value,
      price: formData.price.value,
      imgUrl: formData.imgUrl.value,
      description: formData.description.value,
    }
    _housesService.addHouse(rawHouseData)
    formData.reset()
  }

  deleteHouse(houseId) {
    _housesService.deleteHouse(houseId)
  }

  bidOnHouse(houseId) {
    _housesService.bidOnHouse(houseId)
  }

  // NOTE you can use this for an on click to draw the car form and then get the cars triggering the draw car method from our listeners
  // getCars() {
  //     _drawCarForm()
  //     _carsService.getCars()
  // }
}