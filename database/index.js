import mongoose from "mongoose";

const db = async () => {
  const config = {
    host: process.env.HOST,
    user: process.env.USER,
    pass: process.env.PASS,
  };

  const { host, user, pass } = config;

  mongoose.connect(
    `mongodb+srv://${user}:${pass}@${host}/?retryWrites=true&w=majority`
  );

  return mongoose;
};

export default db;
