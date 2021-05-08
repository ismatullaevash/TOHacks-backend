import FarmsDAO from "../dao/farmsDAO.js"

export default class FarmsController {
  static async apiGetFarms(req, res, next) {
    const farmsPerPage = req.query.farmsPerPage ? parseInt(req.query.farmsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.postedBy) {
      filters.postedBy = req.query.postedBy
    } else if (req.query.postId) {
      filters.postId = req.query.postId
    } else if (req.query.title) {
      filters.title = req.query.title
    }

    const { farmsList, totalNumFarms } = await FarmsDAO.getFarms({
      filters,
      page,
      farmsPerPage,
    })

    let response = {
      farms: farmsList,
      page: page,
      filters: filters,
      entries_per_page: farmsPerPage,
      total_results: totalNumFarms,
    }
    res.json(response)
  }
  /*
  
*/
  static async apiGetAddress(req, res, next) {
    try {
      let addresses = await FarmsDAO.getAddress()
      res.json(addresses)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
  static async apiAddFarm(req, res, next) {
    try {
      const farmInfo = {
        title: req.body.title,
        address: req.body.address,
        website: req.body.website,
        postedBy: req.body.postedBy,
        phoneNum:req.body.phoneNum
      };
      const date = new Date();

      const ReviewResponse = await FarmsDAO.addFarm(farmInfo, date);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}