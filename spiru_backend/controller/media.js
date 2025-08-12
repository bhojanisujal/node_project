const path = require('path');
const Media = require('../model/media');

// Create and save media entries
const uploadMediaFiles = async (req, res) => {
    try {
        const { category } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "No media files received." });
        }

        const formattedFiles = req.files.map((item) => ({
            filename: item.filename,
            originalname: item.originalname,
            url: `${process.env.SERVER_URL}/media/${item.filename}`,
            size: item.size,
            category,
            fileType: path.extname(item.originalname)
        }));

        const savedFiles = await Media.insertMany(formattedFiles);

        if (!savedFiles || savedFiles.length === 0) {
            return res.status(500).json({ success: false, message: "Media upload failed." });
        }

        return res.status(201).json({ success: true, data: savedFiles, message: "Media uploaded successfully." });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// Fetch all media items
const fetchAllMedia = async (req, res) => {
    try {
        const results = await Media.find()
            .select("-filename -size -updatedAt -__v")
            .sort({ createdAt: -1 });

        if (!results || results.length === 0) {
            return res.status(404).json({ success: false, message: "No media found." });
        }

        return res.status(200).json({ success: true, data: results, message: "Media fetched successfully." });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// Fetch single media by ID
const fetchSingleMedia = async (req, res) => {
    try {
        const mediaId = req.params.id;

        const item = await Media.findById(mediaId);
        if (!item) {
            return res.status(404).json({ success: false, message: "Media not found." });
        }

        return res.status(200).json({ success: true, data: item, message: "Media retrieved." });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// Remove media by ID
const removeMediaById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Media.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ success: false, message: "No media matched the given ID." });
        }

        return res.status(200).json({ success: true, message: "Media deleted successfully." });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// Fetch media by category
const filterMediaByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const query = category === "all" ? {} : { category };

        const data = await Media.find(query)
            .select("-filename -size -__v -updatedAt")
            .sort({ createdAt: -1 });

        if (!data || data.length === 0) {
            return res.status(200).json({ success: true, data: [], message: "No media found for this category." });
        }

        return res.status(200).json({ success: true, data, message: "Category media loaded successfully." });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    uploadMediaFiles,
    fetchAllMedia,
    fetchSingleMedia,
    removeMediaById,
    filterMediaByCategory
};
