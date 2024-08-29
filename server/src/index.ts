import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import path from "path";
dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

import FileRouter from "./routes/FileRoutes";
import UserRouter from "./routes/UserRoutes";
import FolderRouter from "./routes/FolderRoute";
import SearchRouter from "./routes/SearchRoutes";

app.use("/api/files", FileRouter);
app.use("/api/folders", FolderRouter);
app.use("/api/search", SearchRouter);

app.use("/api/user", UserRouter);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});
