import mongoose from "mongoose";
import historyModel from "../models/historyModel.js";

// Add to History
export const addHistory = async (req, res) => {
    try {
        const userId = mongoose.Types.ObjectId.createFromHexString(req.user.id);
        if(!userId) return res.status(401).json({ error: "Invalid session." });

        const { location } = req.body;
        if (!location) return res.status(400).json({ error: "Location is required" });

        const historyEntry = await historyModel.create({ userId, location });
        return res.status(201).json({ message: "History added", history: historyEntry });
    } catch (err) {
        return res.status(500).json({ error: "Error adding to history" });
    }
};

// Get History
export const getHistory = async (req, res) => {
    try {
        const userId = mongoose.Types.ObjectId.createFromHexString(req.user.id);
        if(!userId) return res.status(401).json({ error: "Invalid session." });
        
        // Get page from query params, default to 1
        const page = parseInt(req.query.page, 10) || 1;
        const limit = 25;
        const skip = (page - 1) * limit;

        // Fetch paginated history
        const history = await historyModel.find({ userId }).sort({ searchedAt: -1 }).skip(skip).limit(limit);

        // total count for frontend to know total pages
        const total = await historyModel.countDocuments({ userId });

        return res.status(200).json({history,currentPage: page,totalPages: Math.ceil(total / limit),totalRecords: total});

    } catch (err) {
        return res.status(500).json({ error: "Error fetching history" });
    }
};

// Remove Specific History Entry
export const removeHistoryItem = async (req, res) => {
    try {
        const userId = mongoose.Types.ObjectId.createFromHexString(req.user.id);
        if(!userId) return res.status(401).json({ error: "Invalid session." });

        const { id } = req.params;
        const docId = mongoose.Types.ObjectId.createFromHexString(id);

        const deleted = await historyModel.findOneAndDelete({ _id: docId, userId });
        if (!deleted) return res.status(404).json({ error: "History item not found" });

        return res.status(200).json({ message: "History item removed" });
    } catch (err) {
        return res.status(500).json({ error: "Error removing history item" });
    }
};

// Clear All History
export const clearHistory = async (req, res) => {
    try {
        const userId = mongoose.Types.ObjectId.createFromHexString(req.user.id);
        if(!userId) return res.status(401).json({ error: "Invalid session." });

        await historyModel.deleteMany({ userId });
        return res.status(200).json({ message: "All history cleared" });

    } catch (err) {
        return res.status(500).json({ error: "Error clearing history" });
    }
};
