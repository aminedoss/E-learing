const mongoose = require("mongoose");
const CvSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: [true, "name of file is required"],
        },
    file: {
        type: String,
        required: [true, "Please provide a file "],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
},
);
module.exports = mongoose.model("CV", CvSchema);