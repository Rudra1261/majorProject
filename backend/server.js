import express from "express";
import paper from "./model.js";
import path from "path";
import multer from "multer";
import Mongoose from "mongoose";
import cors from 'cors'
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// app.use(express.any())
const Port = 5000;
const mongoURI = "mongodb://localhost:27017/dataDB";

const connectDB = async () => {
  try {
    await Mongoose.connect(mongoURI, {
      useNewURLParser: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
connectDB()
app.listen(Port, () => console.log(`Server connected on Port:${Port}`))

const storage = multer.diskStorage({
  destination: "./public/",
  filename: function (req, file, cb) {
    cb(null, "FILE-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10000000 },
}).any();
// app.use(upload.array());
const obj = (req, res) => {
  upload(req, res, () => {
    console.log("Request -- ", req.body);
    console.log(req.files)
    // console.log("Request File -- ", req.file);
    const file = new paper({
        name: req.body.name,
        imf: req.body.imf,
        authorType: req.body.authorType,
        file_data: req.files[0],
        date: req.body.date
    });
    
    console.log(file)
    file.save().then(() => {
      res.send("Upload Sucessful");
      console.log("Sucess")
    });
  });
};

router.post("/upload", obj);

app.use(router);
app.get("/", (req, res) => {
  return res.send("Hello World ");
});
