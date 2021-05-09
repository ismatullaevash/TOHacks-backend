import express from "express";
import FarmsCtrl from "./farms.controller.js"
import UsersCtrl from "./users.controller.js"
import BookingsController from "./booking.controller.js"
const router = express.Router();
router.route("/farms").get(FarmsCtrl.apiGetFarms);

router.route("/farms/address").get(FarmsCtrl.apiGetAddress);
router.route("/farms").post(FarmsCtrl.apiAddFarm)

router.route("/bookings").post(BookingsController.apiAddBooking);
router.route("/bookings").get(BookingsController.apiGetBookings);

;
router.route("/users").get(UsersCtrl.apiGetUser);
router
  .route("/users")
  .post(UsersCtrl.apiAddUser)
export default router;
