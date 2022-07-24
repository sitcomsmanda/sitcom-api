import dbConnect from "../../lib/dbConnect";
import Member from "../../models/Member";

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
  const { method } = req;

  await dbConnect();

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
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
