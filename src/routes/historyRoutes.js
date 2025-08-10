import express from "express";
import {
    addHistory,
    getHistory,
    removeHistoryItem,
    clearHistory
} from "../controller/historyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const historyRouter = express.Router();

// All routes protected
historyRouter.post("/add", authMiddleware, addHistory);
historyRouter.get("/get", authMiddleware, getHistory);
historyRouter.delete("/:id", authMiddleware, removeHistoryItem);
historyRouter.delete("/", authMiddleware, clearHistory);

export default historyRouter;
