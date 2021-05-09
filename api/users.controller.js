import UserDAO from "../dao/usersDAO.js";

export default class UsersController {
  static async apiAddUser(req, res, next) {
    try {
      const userInfo = {
        username: req.body.username,
        userId: req.body.userId,
        email: req.body.email,
        phoneNum: req.body.phoneNum,
      };

      const bookings = req.body.bookings;
      const date = new Date();

      const ReviewResponse = await UserDAO.addUser(userInfo, bookings, date);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiUpdateBooking(req, res, next) {
    try {
      const _id = req.body._id;
      const bookings = req.body.bookings;
      const userId = req.body.userId;

      const reviewResponse = await UserDAO.updateUser(_id, userId, bookings);

      var { error } = reviewResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster"
        );
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiGetUser(req, res, next) {
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

    const { farmsList, totalNumFarms } = await UserDAO.getUsers({
      filters,
      page,
      farmsPerPage,
    });

    let response = {
      users: farmsList,
      page: page,
      filters: filters,
      entries_per_page: farmsPerPage,
      total_results: totalNumFarms,
    };
    res.json(response);
  }
}
