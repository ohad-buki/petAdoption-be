const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const { postgrator } = require("./data/mysqlDB");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    res.send("hello world");
  } catch (error) {
    console.log(error);
  }
});

app.use("/users", require("./routes/usersRoute.js"));
app.use("/pets", require("./routes/petsRoute.js"));
app.use("/likes", require("./routes/likesRoute.js"));

postgrator
  .migrate()
  .then((result) => {
    console.log("migrate", result);
    app.listen(port, () => {
      console.log("server is up");
    });
  })
  .catch((e) => console.log(e));
