
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const {
    createCamp,
    getCamps: getAllCamps,
    getCampById,
    updateCamp,
    deleteCamp,
    getCampImage,
} = require('../controllers/campController');

/**
 * @swagger
 * tags:
 *   name: Camps
 *   description: Camp management
 */

/**
 * @swagger
 * /api/camps:
 *   get:
 *     summary: Get all camps
 *     tags: [Camps]
 *     responses:
 *       200:
 *         description: List of camps
 */
router.get('/', getAllCamps);

/**
 * @swagger
 * /api/camps/{id}:
 *   get:
 *     summary: Get a single camp by ID
 *     tags: [Camps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Camp ID
 *     responses:
 *       200:
 *         description: Camp details
 *       404:
 *         description: Camp not found
 */
router.get('/:id', getCampById);

/**
 * @swagger
 * /api/camps/{id}/image:
 *   get:
 *     summary: Get camp image by camp ID
 *     tags: [Camps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Camp ID
 *     responses:
 *       200:
 *         description: Camp image
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Image not found
 */
router.get('/:id/image', getCampImage);



/**
 * @swagger
 * /api/camps:
 *   post:
 *     summary: Create a new camp
 *     tags: [Camps]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - location
 *               - description
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (optional)
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Camp created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', upload.single('image'), createCamp);

/**
 * @swagger
 * /api/camps/{id}:
 *   put:
 *     summary: Update a camp by ID
 *     tags: [Camps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Camp ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (optional)
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Camp updated successfully
 *       404:
 *         description: Camp not found
 */
router.put('/:id', upload.single('image'), updateCamp);

/**
 * @swagger
 * /api/camps/{id}:
 *   delete:
 *     summary: Delete a camp by ID
 *     tags: [Camps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Camp ID
 *     responses:
 *       200:
 *         description: Camp deleted successfully
 *       404:
 *         description: Camp not found
 */
router.delete('/:id', deleteCamp);

module.exports = router;
