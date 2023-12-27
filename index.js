import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import {
    registerValidation,
    loginValidation,
    postCreateValidation,
    postUpdateValidation
} from "./validations.js"
import { UserController, PostController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";

mongoose
    .connect("mongodb+srv://root:toor@testapp.nzfqted.mongodb.net/blog?retryWrites=true&w=majority",)
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err));


const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads");
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register);
app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, postUpdateValidation, PostController.update);

app.get("/", (req, res) => {
    console.log("New visitor.");
    res.status(200).send("YAAAAAAAHOOOOOOOOOOO!!1");
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server OK");
});