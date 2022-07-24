/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */
const handler = (req, res) => {
  res.status(200).json({
    result: "hello world",
  });
};

export default handler;
