import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let bookings;

export default class BookingDAO {
  static async injectDB(conn) {
    if (bookings) {
      return;
    }
    try {
      bookings = await conn
        .db(process.env.RESTAURANT_REVIEWS_NS)
        .collection("bookings");
    } catch (e) {
      console.error(
        `Unable to establish collection handles in bookingDAO: ${e}`
      );
    }
  }

  static async addBooking(booking, date) {
    try {
      const bookingDoc = {
        title: booking.title,
        address: booking.address,
        dateBooked: date,
        bookingPhoneNum: booking.phoneNum,
        website: booking.website,
        farmerName: booking.postedBy,
        userEmail: booking.userEmail,
      };

      return await bookings.insertOne(bookingDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }
  static async getBookings({
    filters = null,
    page = 0,
    farmsPerPage = 10,
  } = {}) {
    let query;
    if (filters) {
      if ("farmerName" in filters) {
        query = { $text: { $search: filters["farmerName"] } };
      } else if ("userEmail" in filters) {
        query = { userEmail: { $eq: filters["userEmail"] } };
      }
    }

    let cursor;

    try {
      cursor = await bookings.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { farmsList: [], totalNumFarms: 0 };
    }

    const displayCursor = cursor.limit(farmsPerPage).skip(farmsPerPage * page);

    try {
      const farmsList = await displayCursor.toArray();
      const totalNumFarms = await bookings.countDocuments(query);

      return { farmsList, totalNumFarms };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { farmsList: [], totalNumFarms: 0 };
    }
  }
}
