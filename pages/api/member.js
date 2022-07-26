import Cors from "cors";

import dbConnect from "../../lib/dbConnect";
import Member from "../../models/Member";
import Token from "../../models/Token";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

/**
 * @swagger
 * /api/member:
 *   get:
 *    description: Returns all the member
 *    parameters:
 *      - in: query
 *        name: token
 *        schema:
 *          type: string
 *          required: true
 *        description: token to access data
 *      - in: query
 *        name: search
 *        schema:
 *          type: string
 *        description: member search query
 *    responses:
 *      200:
 *        description: array of member object
 *      400:
 *        description: no token specified
 */

const handler = async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const { method, query } = req;
  const token = query.token;

  await dbConnect();

  if (token) {
    const tokenData = await Token.findOne({ token: token });
    if (tokenData) {
      switch (method) {
        case "GET":
          try {
            if (query.search) {
              const search = query.search;
              const members = await Member.find({
                $text: { $search: search },
              });
              if (members.length >= 1) {
                res.status(200).json({
                  success: true,
                  msg: "found",
                  data: members,
                });
              } else {
                res.status(200).json({
                  success: true,
                  msg: "not found",
                  data: members,
                });
              }
            } else {
              const members = await Member.find({});
              res.status(200).json({
                success: true,
                msg: "found",
                data: members,
              });
            }
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
