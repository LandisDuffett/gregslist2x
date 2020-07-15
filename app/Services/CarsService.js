import _store from '../store.js'
import Car from "../Models/Car.js";
import store from '../store.js';

// @ts-ignore
const _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api",
  timeout: 10000
})


class CarsService {
  constructor() {
    console.log("Hello from the car service");
    this.getCars()
  }

  bidOnCar(carId) {
    let updatedCar = store.State.cars.find(car => car.id == carId)
    updatedCar.price += 100
    _api.put("cars/" + carId, updatedCar).then(res => {
      let cars = store.State.cars.map(c => {
        if (c.id == carId) {
          // res.data.data is my updated car from the server with the new price
          return new Car(res.data)
        } else {
          return new Car(c)
        }
      })
      store.commit("cars", cars)
      console.log(res);
    }).catch(err => console.error(err))
  }

  getCars() {
    _api.get("cars").then(res => {
      // NOTE always console log the res to see what the api gave you
      console.log(res);
      // NOTE turn our pojos from the api into real CARS
      let cars = res.data.data.map(rawCarData => new Car(rawCarData))
      store.commit("cars", cars)
    }).catch(err => console.error(err))
  }

  deleteCar(carId) {
    _api.delete("cars/" + carId).then(res => {
      this.getCars()
    }).catch(err => console.error(err))
  }

  addCar(rawCarData) {
    _api.post("cars", rawCarData).then(res => {
      console.log(res);
      // NOTE we have other users adding to this db collection so now is a nice time to refresh and sync our local data with our db. We could of just pushed this new car from the response back into our local if it was a private collection that only we modify.
      this.getCars()
    }).catch(err => console.error(err))
  }
}


const SERVICE = new CarsService()
export default SERVICE