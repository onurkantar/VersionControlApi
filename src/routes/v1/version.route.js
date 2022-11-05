const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
const versionController = require('../../controllers/version.controller');

const router = express.Router();

router.route('/').post(versionController.addVersion).get(versionController.getVersions);

router
  .route('/:versionId')
  .get(versionController.getVersion)
  .patch(versionController.updateVersion)
  .delete(versionController.deleteVersion);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Versions
 *   description: Version management and retrieval
 */

/**
 * @swagger
 * /versions:
 *   post:
 *     summary: Add a version
 *     description: Only admins can post version.
 *     tags: [Versions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - versionNumber
 *               - applicationType
 *               - fileUrl
 *             properties:
 *               application type:
 *                 type: string
 *                 enum: [mobile, service]
 *               versionNumber:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *             example:
 *               application type: mobile
 *               versionNumber: 1.21.00.00
 *               fileUrl: ftp://download.logo.com.tr/DivaMobile/Release/1.21.00.00/DivaMobileSales-release-1.21.00.00-361.apk
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Version'
 *       "400":
 *         $ref: '#/components/responses/DuplicateVersionNumber'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all versions
 *     description: Only admins can retrieve all versions.
 *     tags: [Versions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of versions
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Version'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /versions/{id}:
 *   get:
 *     summary: Get a version
 *     description: Get a version
 *     tags: [Versions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Version id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Version'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a version
 *     description: Update a version
 *     tags: [Versions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Version id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               application type:
 *                 type: string
 *                 enum: [mobile, service]
 *               versionNumber:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *             example:
 *               application type: mobile
 *               versionNumber: 1.21.00.00
 *               fileUrl: ftp://download.logo.com.tr/DivaMobile/Release/1.21.00.00/DivaMobileSales-release-1.21.00.00-361.apk
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Version'
 *       "400":
 *         $ref: '#/components/responses/DuplicateVersionNumber'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a version
 *     description: Delete a version
 *     tags: [Versions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Version id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
