const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const {
  getAllData,
  getdataById,
  createData,
  deleteData,
  updateData,
} = require("./mainController");
const port = 3000;
const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

router.route("/").get(getAllData).post(createData);
router.route("/:id").get(getdataById).patch(updateData).delete(deleteData);
/*app.get("/api/v1/data/:id", getdataById);
app.post("/api/v1/data", createData);

app.delete("/api/v1/data/:id", deleteData);

app.patch("/api/v1/data/:id", updateData);
*/

app.use("/api/v1/data", router);
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
