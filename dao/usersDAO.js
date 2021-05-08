import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let users;

export default class UserDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn
        .db(process.env.RESTAURANT_REVIEWS_NS)
        .collection("users");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async addUser(user, date) {
    try {
      const newUser = {
        username: user.username,
        userId: user.userId,
        email: user.email,
        phoneNum: user.phoneNum,
        dateCreated: date,
      };

      return await users.insertOne(newUser);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }
/*
  static async updateUser(_id, currentUserId, bookings) {
    try {
      const updateResponse = await users.updateOne(
        { userId: currentUserId, _id: ObjectId(_id) },
        { $set: { bookings: bookings } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }
  */
  static async getUsers({ filters = null, page = 0, farmsPerPage = 10 } = {}) {
    let query;
    if (filters) {
      if ("username" in filters) {
        query = { $text: { $search: filters["username"] } };
      } else if ("postId" in filters) {
        query = { postId: { $eq: filters["postId"] } };
      }
    }

    let cursor;

    try {
      cursor = await users.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { farmsList: [], totalNumFarms: 0 };
    }

    const displayCursor = cursor.limit(farmsPerPage).skip(farmsPerPage * page);

    try {
      const farmsList = await displayCursor.toArray();
      const totalNumFarms = await users.countDocuments(query);

      return { farmsList, totalNumFarms };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { farmsList: [], totalNumFarms: 0 };
    }
  }
  /*
  static async getUserByID(id) {
    try {
      const pipeline = [
        {
            $match: {
                userId: new (id),
            },
        },
              {
                  $lookup: {
                      from: "bookings",
                      let: {
                          id: "$userId",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$userId", "$$id"],
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                      ],
                      as: "bookings",
                  },
              },
              {
                  $addFields: {
                      bookings: "$bookings",
                  },
              },
          ]
      return await users.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`)
      throw e
    }
  }*/
}
