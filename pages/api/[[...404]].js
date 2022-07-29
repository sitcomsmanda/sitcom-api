const handler = async (req, res) => {
  res.status("404").send({
    success: false,
    msg: "Invalid url",
  });
};

export default handler;
