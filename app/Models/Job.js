export default class Job {
  constructor(data) {
    this.id = data._id || data.id
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.rate = data.rate
    this.hours = data.hours
    this.imgUrl = data.imgUrl
    this.description = data.description
  }

  get Template() {
    return `
        <div class="col-3 border rounded shadow">
                <h1>Company: ${this.company}</h1>
                <h1>Title: ${this.jobTitle}</h1>
                <h1>Hourly pay: ${this.rate}</h1>
                <h1>Hours per week: $${this.hours}</h1>
                <img class="img-fluid" src="${this.imgUrl}"/>
                <h1>${this.description}</h1>
                <button class="btn btn-danger" onclick="app.jobsController.deleteJob('${this.id}')">Delort</button>
                <button class="btn btn-info" onclick="app.jobsController.bidOnJob('${this.id}')">Bid</button>
            </div>`
  }
}