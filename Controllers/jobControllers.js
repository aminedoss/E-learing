const jobModel = require("../Models/jobModel");
const mongoose = require("mongoose");

const createJobController = async (req, res, next) => {
    try {
        const { company, position } = req.body;
        if (!company || !position) {
            return next("Please Provide All Fields");
        }
        req.body.createdBy = req.user.userId;
        const job = await jobModel.create(req.body);
        res.status(201).json({ job });
    } catch (error) {
        next(error);
    }
};

const getAllJobsController = async (req, res, next) => {
    try {
        //const jobs = await jobModel.find({ createdBy: req.user.userId });
        const jobs = await jobModel.find();
        res.status(200).json({
            totalJobs: jobs.length,
            jobs,
        });
    } catch (error) {
        next(error);
    }
};

const updateJobsController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { company, position } = req.body;
        if (!company || !position) {
            return next("Please Provide All Fields");
        }
        const job = await jobModel.findOne({ _id: id });
        if (!job) {
            return next(`No job found with this ID: ${id}`);
        }
        if (req.user.userId !== job.createdBy.toString()) {
            return next("You are not authorized to update this job");
        }
        const updatedJob = await jobModel.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200).json({ updatedJob });
    } catch (error) {
        next(error);
    }
};

const deleteJobController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await jobModel.findOne({ _id: id });
        if (!job) {
            return next(`No Job Found With This ID: ${id}`);
        }
        if (req.user.userId !== job.createdBy.toString()) {
            return next("You are not authorized to delete this job");
        }
        await job.deleteOne();
        res.status(200).json({ message: "Success, Job Deleted!" });
    } catch (error) {
        next(error);
    }
};

const jobStatsController = async (req, res, next) => {
    try {
        const stats = await jobModel.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(req.user.userId),
                },
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        const defaultStats = {
            pending: stats.pending || 0,
            reject: stats.reject || 0,
            interview: stats.interview || 0,
        };

        res.status(200).json({ stats: defaultStats });
    } catch (error) {
        next(error);
    }
};
module.exports=
{
    createJobController,
    getAllJobsController,
    updateJobsController,
    deleteJobController,
    jobStatsController
};
