import { config } from "dotenv";

import express, { Request, Response } from "express";
import http from "http";
config();
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => res.send("API Is Running"));
app.use("/api/email", require("./routes/email"));
app.use("/api/meta", require("./routes/meta"));
app.use("/api/shopifystore", require("./routes/shopify-store"));
app.use("/api/cloudinary", require("./routes/cloudinary"));

const server = http.createServer(app);

const PORT = process.env.PORT || "5000";

server.listen(PORT, () => console.log("Server running on PORT:" + PORT));
