import { asyncHandler } from "../../../middleware/asyncHandler.js";
import userModel from './../../../DB/models/user.model.js';
import { paginate } from './../../../services/pagination.js';
import cloudinary from './../../../services/cloudinary.js';
const MAX_FILE_SIZE = 10000000; // 10MB in bytes


export const getUsers = asyncHandler(
    async (req, res, next) => {
        //paginate
        let { page, size, sortName, sortDate, search, searchBy } = req.query
        if (!size) { size = 5 }
        const { skip, limit } = paginate(page, size)

        //sorting
        let sorting = {}
        if (sortDate !== '0') {
            sorting.createdAt = Number(sortDate)
        }
        if (sortName !== '0') {
            sorting.firstName = Number(sortName)
        }

        //searching
        let searchQuery = {};
        if (search) {
            if (searchBy === 'name') {
                searchQuery = {
                    $or: [
                        { firstName: { $regex: search, $options: 'i' } },
                        { lastName: { $regex: search, $options: 'i' } }
                    ]
                }
            } else {
                searchQuery[searchBy] = { $regex: search, $options: 'i' };
            }
        }

        const students = await userModel.find(searchQuery).limit(limit).skip(skip).sort(sorting);
        const totalStudents = await userModel.find(searchQuery).countDocuments()
        const totalPages = Math.ceil(totalStudents / size)
        return res.status(200).json({ message: "done", students, totalStudents, totalPages })
    }
)
export const addUser = asyncHandler(
    async (req, res, next) => {
        req.body.email = req.body.email.toLowerCase();
        const exist = await userModel.findOne({ email: req.body.email })
        if (exist) {
            return next(Error('Email Already Exist!', { cause: 409 }))
        }
        const newUser = await userModel.create(req.body)
        return newUser ? res.status(201).json({ message: "done", user: newUser }) : next(Error('Failed to add user', { cause: 400 }))
    }
)
export const editUser = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params
        req.body.email = req.body.email.toLowerCase();
        const exist = await userModel.findOne({ email: req.body.email }).select('email')
        if (exist && JSON.stringify(exist._id) !== JSON.stringify(id)) {
            return next(Error('Email Already Exist!', { cause: 409 }))
        }

        // const { profilePic } = await findById({ model: userModel, filter: { _id: req.user._id }, select: 'profilePic' });
        // if (profilePic.secure_url !== secureURL) {
        //     cloudinary.uploader.destroy(profilePic.public_id);
        // }

        const updated = await userModel.findByIdAndUpdate(id, req.body)
        return updated ? res.status(200).json({ message: "done", user: updated }) : next(Error('Failed to update user', { cause: 400 }))
    }
)
export const deleteUser = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params
        const { profilePic } = await userModel.findById(id).select('profilePic')
        cloudinary.uploader.destroy(profilePic.public_id).catch(error => {
            console.log(`Error deleting image`, error);
        });
        const deleted = await userModel.findByIdAndDelete(id)
        return deleted ? res.status(200).json({ message: "done" }) : next(Error('Failed to Remove user', { cause: 400 }))

    }
)
export const deleteMany = asyncHandler(
    async (req, res, next) => {
        const { deleteIds } = req.body
        if (!deleteIds || deleteIds.length === 0) {
            return next(Error('No Users Selected!', { cause: 400 }))
        }
        // Delete images from Cloudinary
        const users = await userModel.find({ _id: { $in: deleteIds } }).select('profilePic');
        const publicIds = users.map(user => user.profilePic.public_id);
        for (const publicId of publicIds) {
            if (publicId) {
                cloudinary.uploader.destroy(publicId).catch(error => {
                    console.log(`Error deleting image with public_id ${publicId}:`, error);
                });
            }
        }
        const deleted = await userModel.deleteMany({ _id: { $in: deleteIds } });
        return deleted.deletedCount ? res.status(200).json({ message: "done" }) : next(Error('No Users Selected', { cause: 400 }))

    }
)

export const addProfilePic = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params
        if (!req.file) {
            return next(Error('please upload the image', { cause: 400 }));
        }

        //check size
        if (req.file.size > MAX_FILE_SIZE) {
            return next(Error('File size too large. Maximum allowed size is 10MB.', { cause: 400 }));
        }

        //remove old if there
        const user = await userModel.findById(id).select('profilePic')
        if (user.profilePic?.public_id) {
            cloudinary.uploader.destroy(user.profilePic.public_id);
        }

        //upload new image
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `student_dashboard/${id}/profilePic` }).catch((error) => { console.log(error) });
        req.body.profilePic = { secure_url, public_id };
        const student = await userModel.findByIdAndUpdate(id, req.body, { new: true }).select('profilePic')
        return res.status(200).json({ message: "done", student })
    }
)