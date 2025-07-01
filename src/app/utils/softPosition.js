const memberModel = require('../model/memberModel');

async function softPosition() {
  return memberModel.aggregate([
    {
      $match: {
        status:"",
        position: { $in: ["GAD", "DM", "SrUM", "UM", "FC"] },
      }
    },
    {
      $addFields: {
        positionOrder: {
          $switch: {
            branches: [
              { case: { $eq: ["$position", "GAD"] }, then: 1 },
              { case: { $eq: ["$position", "DM"] }, then: 2 },
              { case: { $eq: ["$position", "SrUM"] }, then: 3 },
              { case: { $eq: ["$position", "UM"] }, then: 4 },
              { case: { $eq: ["$position", "FC"] }, then: 5 }
            ],
            default: 999
          }
        }
      }
    },
    { $sort: { positionOrder: 1 } }
  ]);
}
module.exports = softPosition;