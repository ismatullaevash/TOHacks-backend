import express from "express";
import FarmsCtrl from "./farms.controller.js"
import UsersCtrl from "./users.controller.js"
import BookingsController from "./booking.controller.js"
const router = express.Router();
router.route("/farms").get(FarmsCtrl.apiGetFarms);
//router.route("/farms/id/:id").get(UsersCtrl.apiGetUserById);
router.route("/farms/address").get(FarmsCtrl.apiGetAddress);
router.route("/farms").post(FarmsCtrl.apiAddFarm)
router.route("/booking").post(BookingsController.apiAddBooking);
router.route("/users").get(UsersCtrl.apiGetUser);
router
  .route("/user")
  .post(UsersCtrl.apiAddUser)
  .put(UsersCtrl.apiUpdateBooking)
export default router;
