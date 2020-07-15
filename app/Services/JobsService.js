import _store from '../store.js'
import Job from "../Models/Job.js";
import store from '../store.js';

// @ts-ignore
const _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api",
  timeout: 10000
})


class JobsService {
  constructor() {
    console.log("Hello from the job service");
    this.getJobs()
  }

  bidOnJob(jobId) {
    let updatedJob = store.State.jobs.find(job => job.id == jobId)
    updatedJob.price += 100
    _api.put("jobs/" + jobId, updatedJob).then(res => {
      let jobs = store.State.jobs.map(c => {
        if (c.id == jobId) {
          // res.data.data is my updated car from the server with the new price
          return new Job(res.data)
        } else {
          return new Job(c)
        }
      })
      store.commit("jobs", jobs)
      console.log(res);
    }).catch(err => console.error(err))
  }

  getJobs() {
    _api.get("jobs").then(res => {
      // NOTE always console log the res to see what the api gave you
      console.log(res);
      // NOTE turn our pojos from the api into real CARS
      let jobs = res.data.data.map(rawJobData => new Job(rawJobData))
      store.commit("jobs", jobs)
    }).catch(err => console.error(err))
  }

  deleteJob(jobId) {
    _api.delete("jobs/" + jobId).then(res => {
      this.getJobs()
    }).catch(err => console.error(err))
  }

  addJob(rawJobData) {
    _api.post("jobs", rawJobData).then(res => {
      console.log(res);
      // NOTE we have other users adding to this db collection so now is a nice time to refresh and sync our local data with our db. We could of just pushed this new car from the response back into our local if it was a private collection that only we modify.
      this.getJobs()
    }).catch(err => console.error(err))
  }
}


const SERVICE = new JobsService()
export default SERVICE