import BookingDAO from "../dao/bookingDAO.js";
import pkg from "@trycourier/courier";
const { CourierClient } = pkg;
export default class BookingsController {
  static async sendMessage(address) {
    const courier = CourierClient({
      authorizationToken: "dk_prod_NXY4AZP6FZMSMVQZ7YWEXHFMKT7T",
    });

    // Example: send a message supporting email & SMS
    const { messageId } = await courier.send({
      eventId: "GJM780DKQJ4PTHJPSTSCAB7WYYT0",
      recipientId: "3c409c03-fd61-49de-945e-d23e2df7a447",
      profile: {
        email: "niyomex753@ffuqzt.com",
      },
      data: {
        text: address,
        name: "Joey",
      },
      override: {},
    });
  }
  static async apiAddBooking(req, res, next) {
    try {
      const booking = {
        title: req.body.title,
        address: req.body.address,
        phoneNum: req.body.phoneNum,
        website: req.body.website,
        postedBy: req.body.postedBy,
        userEmail:req.body.userEmail,
        userName:req.body.userName
      };
      const date = new Date();
      const userId = req.body.userId;
      const emailSendout={
        name:req.body.userName,
        email:req.body.userEmail,
        address:req.body.address,
        phoneNum:req.body.phoneNum,
        postingName:req.body.postedBy,
        website:req.body.website
      }
      const ReviewResponse = await BookingDAO.addBooking(userId, booking, date);
      ///////
      const courier = CourierClient({
        authorizationToken: "dk_prod_NXY4AZP6FZMSMVQZ7YWEXHFMKT7T",
      });

      // Example: send a message supporting email & SMS
      const { messageId } = await courier.send({
        eventId: "GJM780DKQJ4PTHJPSTSCAB7WYYT0",
        recipientId: "3c409c03-fd61-49de-945e-d23e2df7a447",
        profile: {
          email: emailSendout.email,
        },
        data: {
          text: emailSendout.address,
          name: emailSendout.name,
          phoneNum:emailSendout.phoneNum,
          postingName:emailSendout.postingName,
          website:emailSendout.website
          
        },
        override: {},
      });
      //////
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiGetBookings(req, res, next) {
    const farmsPerPage = req.query.farmsPerPage
      ? parseInt(req.query.farmsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.username) {
      filters.username = req.query.username;
    } else if (req.query.userId) {
      filters.userId = req.query.userId;
    }

    const { farmsList, totalNumFarms } = await BookingDAO.getBookings({
      filters,
      page,
      farmsPerPage,
    });

    let response = {
      bookings: farmsList,
      page: page,
      filters: filters,
      entries_per_page: farmsPerPage,
      total_results: totalNumFarms,
    };
    res.json(response);
  }
}
