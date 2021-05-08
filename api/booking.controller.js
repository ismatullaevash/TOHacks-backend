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
 
}
