require("dotenv").config();
const express = require("express");
const {connectionDB} = require("./mongoDb/connection")
const app = express();

app.use(express.json());
const noteRouter = require("./routes/noteRoute");

// connecting to the mongoDB(Database)

connectionDB();

//Routes

app.use("/api/note", noteRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () =>{
    console.log(`App is running on the http://localhost:${PORT}`);
});
