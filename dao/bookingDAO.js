import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let bookings;

export default class BookingDAO {
  static async injectDB(conn) {
    if (bookings) {
      return
    }
    try {
     bookings = await conn.db(process.env.RESTAURANT_REVIEWS_NS).collection("bookings")
    } catch (e) {
      console.error(`Unable to establish collection handles in bookingDAO: ${e}`)
    }
  }

  static async addBooking(userId, booking, date) {
    try {
      const bookingDoc = { 
          title: booking.title,
          address: booking.address,
          dateBooked: date,
          bookingPhoneNum: booking.phoneNum,
          website:booking.website,
          farmerName:booking.postedBy,
          userId: userId }

      return await bookings.insertOne(bookingDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

}