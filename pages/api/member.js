import dbConnect from "../../lib/dbConnect";
import Member from "../../models/Member";
import Token from "../../models/Token";

/**
 * @swagger
 * /api/member:
 *   get:
 *     description: Returns all the member
 *     responses:
 *       200:
 *         description: array of member object
 */

const handler = async (req, res) => {
  const { method, query } = req;
  const token = query.token;

  await dbConnect();

  if (token) {
    const tokenData = await Token.findOne({ token: token });
    if (tokenData) {
      switch (method) {
        case "GET":
          try {
            const members = await Member.find();
            res.status(200).json({
              success: true,
              msg: "found",
              data: members,
            });
          } catch (error) {
            res
              .status(500)
              .json({ success: false, msg: "something went wrong" });
          }
          break;
        default:
          res
            .status(400)
            .json({ success: false, msg: `${method} method not allowed` });
          break;
      }
    } else {
      res.status(400).json({
        success: false,
        msg: "invalid token",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      msg: "no token specified",
    });
  }
};

export default handler;
