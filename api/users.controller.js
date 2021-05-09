import UserDAO from "../dao/usersDAO.js";
import pkg from "@trycourier/courier";
const { CourierClient } = pkg;
export default class UsersController {
  static async apiAddUser(req, res, next) {
    try {
      const userInfo = {
        username: req.body.username,
        userId: req.body.userId,
        email: req.body.email,
        phoneNum: req.body.phoneNum,
      };

      const date = new Date();
      const email = {
        email: req.body.email,
        name: req.body.username,
      };
      const ReviewResponse = await UserDAO.addUser(userInfo, date);
      ///////////
      const courier = CourierClient({
        authorizationToken: "dk_prod_NXY4AZP6FZMSMVQZ7YWEXHFMKT7T",
      });

      // Example: send a message supporting email & SMS
      const { messageId } = await courier.send({
        eventId: "XVMYASND2K4JVVPNZVM193PDT6KJ",
        recipientId: "cb598347-cf16-451a-9c5b-9cbe4b744bf0",
        profile: {
          email: email.email,
        },
        data: {
          name: email.name,
        },
        override: {},
      });

      ///////////
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
