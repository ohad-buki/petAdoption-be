const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/users", require("./routes/usersRoute.js"));
app.use("/pets", require("./routes/petsRoute.js"));

app.listen(port, () => {
  console.log("server is up");
});
