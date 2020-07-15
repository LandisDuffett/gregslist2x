export default class House {
  constructor(data) {
    this.id = data._id || data.id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.year = data.year
    this.price = data.price
    this.imgUrl = data.imgUrl
    this.description = data.description
  }

  get Template() {
    return `
        <div class="col-3 border rounded shadow">
                <h1>Bedrooms: ${this.bedrooms}</h1>
                <h1>Bedrooms: ${this.bathrooms}</h1>
                <h1>Levels: ${this.levels}</h1>
                <h1>Year built: ${this.year}</h1>
                <h1>Price: $${this.price}</h1>
                <img class="img-fluid" src="${this.imgUrl}"/>
                <h1>${this.description}</h1>
                <button class="btn btn-danger" onclick="app.housesController.deleteHouse('${this.id}')">Delort</button>
                <button class="btn btn-info" onclick="app.housesController.bidOnHouse('${this.id}')">Bid</button>
            </div>`
  }
}