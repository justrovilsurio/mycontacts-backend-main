const express = require("express");
const errorHandler = require("./middleware/errorhHandler");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

// app.get("/api/contacts", (req, res) => {
//   res.json({message: "Get all contacts!"});
// });


// This when accepting data from client to server, we need to use body parser
// We need middleware to parse JSON bodies 
app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));

//custom middleware for transforming data like
// what we receive during error in default middleware is not a json, but an html format

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});