import HousesController from "./Controllers/HousesController.js";
import CarsController from "./Controllers/CarsController.js";
import JobsController from "./Controllers/JobsController.js";

class App {
  housesController = new HousesController();
  carsController = new CarsController();
  jobsController = new JobsController();
}


window["app"] = new App();



