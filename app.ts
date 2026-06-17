import express from "express";
import dotenv from "dotenv";
import { router } from "./src/router";
import { globalErrorHandler } from "./src/utils/errors/api-error";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.send("Welcome to Estirio Bus Booking Platform API");
});

app.use("/api", router);

app.use(globalErrorHandler);

app.listen(PORT, () => {
   console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
