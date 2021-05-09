import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let farms;

export default class FarmsDAO {
  static async injectDB(conn) {
    if (farms) {
      return;
    }
    try {
        farms = await conn.db(process.env.RESTAURANT_REVIEWS_NS).collection("farms")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`,
      )
    }
  }

  static async getFarms({
    filters = null,
    page = 0,
    farmsPerPage = 10,
  } = {}) {
    let query;
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters["title"] } }
      } else if ("postedBy" in filters) {
        query = { "postedBy": { $eq: filters["postedBy"] } }
      } else if ("postId" in filters) {
        query = { "postId": { $eq: filters["postId"] } }
      }
    }

    let cursor;
    
    try {
      cursor = await farms
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { farmsList: [], totalNumFarms: 0 }
    }

    const displayCursor = cursor.limit(farmsPerPage).skip(farmsPerPage * page)

    try {
      const farmsList = await displayCursor.toArray()
      const totalNumFarms = await farms.countDocuments(query)

      return { farmsList, totalNumFarms }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { farmsList: [], totalNumFarms: 0 }
    }
  }
 
  static async getAddress() {
    let addresses = []
    try {
      addresses = await farms.distinct("address")
      return addresses
    } catch (e) {
      console.error(`Unable to get addresses, ${e}`)
      return addresses
    }
  }
  static async addFarm(farm,date){
    try {
      const newFarm = {
        title: farm.title,
        address: farm.address,
        website: farm.website,
        datePosted: date,
        postedBy: farm.postedBy,
        phoneNum:farm.phoneNum
      };

      return await farms.insertOne(newFarm);
    } catch (e) {
      console.error(`Unable to add farm: ${e}`);
      return { error: e };
    }
  }
}
