const Camp = require('../models/Camp');
const path = require('path');


const getCamps = async (req, res) => {
    try {
        const camps = await Camp.find().lean();
        
        // Remove image buffers from response to reduce payload size
        const campsResponse = camps.map(camp => {
            if (camp.image) {
                return {
                    ...camp,
                    image: {
                        contentType: camp.image.contentType,
                        filename: camp.image.filename,
                        hasData: !!camp.image.data
                    }
                };
            }
            return camp;
        });
        
        res.status(200).json(campsResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCampById = async (req, res) => {
    try {
        const camp = await Camp.findById(req.params.id).lean();
        if (!camp) {
            return res.status(404).json({ message: 'Camp not found' });
        }
        
        // Remove image buffer from response
        if (camp.image) {
            camp.image = {
                contentType: camp.image.contentType,
                filename: camp.image.filename,
                hasData: !!camp.image.data
            };
        }
        
        res.status(200).json(camp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCamp = async (req, res) => {
    try {
        const { title, location, description, price } = req.body;
        let imageData = null;

        // Handle uploaded file - convert to buffer
        if (req.file) {
            imageData = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                filename: req.file.originalname
            };
        }

        // ✅ Basic validation
        if (!title || !location || !description || !price) {
            return res.status(400).json({
                success: false,
                message: 'All fields (title, location, description, price) are required',
            });
        }

        // ✅ Create and save new camp
        const newCamp = new Camp({ 
            title, 
            location, 
            description, 
            image: imageData, 
            price 
        });
        const savedCamp = await newCamp.save();

        // Remove image buffer from response to reduce payload size
        const campResponse = savedCamp.toObject();
        if (campResponse.image) {
            campResponse.image = {
                contentType: campResponse.image.contentType,
                filename: campResponse.image.filename,
                hasData: !!campResponse.image.data
            };
        }

        return res.status(201).json({
            success: true,
            data: campResponse,
            message: 'Camp created successfully',
        });
    } catch (error) {
        console.error('Error creating camp:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error: Unable to create camp',
            error: error.message,
        });
    }
};

const updateCamp = async (req, res) => {
    try {
        const updateData = { ...req.body };
        
        // Handle uploaded file - convert to buffer
        if (req.file) {
            updateData.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                filename: req.file.originalname
            };
        }

        const updatedCamp = await Camp.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedCamp) {
            return res.status(404).json({ message: 'Camp not found' });
        }

        // Remove image buffer from response
        const campResponse = updatedCamp.toObject();
        if (campResponse.image) {
            campResponse.image = {
                contentType: campResponse.image.contentType,
                filename: campResponse.image.filename,
                hasData: !!campResponse.image.data
            };
        }

        res.status(200).json(campResponse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCamp = async (req, res) => {
    try {
        const deletedCamp = await Camp.findByIdAndDelete(req.params.id);
        if (!deletedCamp) {
            return res.status(404).json({ message: 'Camp not found' });
        }
        res.status(200).json({ message: 'Camp deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCampImage = async (req, res) => {
    try {
        const camp = await Camp.findById(req.params.id);
        if (!camp || !camp.image || !camp.image.data) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.set('Content-Type', camp.image.contentType);
        res.set('Content-Disposition', `inline; filename="${camp.image.filename}"`);
        res.send(camp.image.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCamps,
    getCampById,
    createCamp,
    updateCamp,
    deleteCamp,
    getCampImage
};

