import BookingDAO from "../dao/bookingDAO.js";

export default class BookingsController {
  static async apiAddBooking(req, res, next) {
    try {
      const booking = {
        title: req.body.title,
        address: req.body.address,
        phoneNum: req.body.phoneNum,
        website:req.body.website,
        postedBy:req.body.postedBy,
        
      };
      const date = new Date();
      const userId=req.body.userId;
      const ReviewResponse = await BookingDAO.addBooking(userId,booking, date);
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
