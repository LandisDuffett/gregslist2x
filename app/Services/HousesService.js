import _store from '../store.js'
import House from "../Models/House.js";
import store from '../store.js';

// @ts-ignore
const _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api",
  timeout: 10000
})


class HousesService {
  constructor() {
    console.log("Hello from the house service");
    this.getHouses()
  }

  bidOnHouse(houseId) {
    let updatedHouse = store.State.houses.find(house => house.id == houseId)
    updatedHouse.price += 100
    _api.put("houses/" + houseId, updatedHouse).then(res => {
      let houses = store.State.houses.map(c => {
        if (c.id == houseId) {
          // res.data.data is my updated car from the server with the new price
          return new House(res.data)
        } else {
          return new House(c)
        }
      })
      store.commit("houses", houses)
      console.log(res);
    }).catch(err => console.error(err))
  }

  getHouses() {
    _api.get("houses").then(res => {
      // NOTE always console log the res to see what the api gave you
      console.log(res);
      // NOTE turn our pojos from the api into real CARS
      let houses = res.data.data.map(rawHouseData => new House(rawHouseData))
      store.commit("houses", houses)
    }).catch(err => console.error(err))
  }

  deleteHouse(houseId) {
    _api.delete("houses/" + houseId).then(res => {
      this.getHouses()
    }).catch(err => console.error(err))
  }

  addHouse(rawHouseData) {
    _api.post("houses", rawHouseData).then(res => {
      console.log(res);
      // NOTE we have other users adding to this db collection so now is a nice time to refresh and sync our local data with our db. We could of just pushed this new car from the response back into our local if it was a private collection that only we modify.
      this.getHouses()
    }).catch(err => console.error(err))
  }
}


const SERVICE = new HousesService()
export default SERVICE