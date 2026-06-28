const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
console.log(process.env.MONGO_URI);
const { DB } = require("./config/db");
DB();

app.listen(
  process.env.PORT,
  console.log(`Server is running on port ${process.env.PORT}`),
);
