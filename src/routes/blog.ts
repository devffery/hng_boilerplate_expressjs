import { Router } from "express";
import { authMiddleware } from "../middleware";
import { createBlogController } from "../controllers/createBlogController";
import { BlogController } from "../controllers/BlogController";
import { updateBlogController } from "../controllers/updateBlogController";

const blogRouter = Router();
const blogController = new BlogController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the blog post
 *         title:
 *           type: string
 *           description: Title of the blog post
 *         content:
 *           type: string
 *           description: Content of the blog post
 *         author:
 *           type: string
 *           description: Author of the blog post
 *         Imageurl:
 *           type: string
 *           description: URL of the blog post image
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *           description: Categories of the blog post
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'
 *           description: Tags of the blog post
 *         likes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Like'
 *           description: Likes of the blog post
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *           description: Comments of the blog post
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp of the blog post
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp of the blog post
 *
 *     BlogInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the blog post
 *         content:
 *           type: string
 *           description: Content of the blog post
 *         author:
 *           type: string
 *           description: Author of the blog post
 *         Imageurl:
 *           type: string
 *           description: URL of the blog post image
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *           description: Categories of the blog post
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags of the blog post
 *       required:
 *         - title
 *         - content
 *         - author
 *
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the category
 *         name:
 *           type: string
 *           description: Name of the category
 *
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the tag
 *         name:
 *           type: string
 *           description: Name of the tag
 *
 *     Like:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the like
 *         user:
 *           type: string
 *           description: User who liked the blog post
 *
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the comment
 *         author:
 *           type: string
 *           description: Author of the comment
 *         content:
 *           type: string
 *           description: Content of the comment
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the comment was created
 */


/**
 * @swagger
 * /api/v1/blog/create:
 *   post:
 *     summary: Create a blog post
 *     description: Allow user to create a blog post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogInput'
 *     responses:
 *       '201':
 *         description: Blog post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server error
 */
blogRouter.post("/create", authMiddleware, createBlogController);


/**
 * @swagger
 * /api/v1/blog:
 *   get:
 *     summary: Get all blog posts with pagination
 *     description: Allow user to get all blog posts with pagination (page, limit, offset)
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: offset
 *         in: query
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       '200':
 *         description: List of blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       '500':
 *         description: Server error
 */
blogRouter.get("/", blogController.listBlogs.bind(blogController));

/**
 * @swagger
 * /api/v1/blog/{id}:
 *   get:
 *     summary: Get a single blog post by ID
 *     description: Allow a user to get a single post by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Blog post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '404':
 *         description: Blog post not found
 *       '500':
 *         description: Server error
 */

blogRouter.get(
  "/",
  authMiddleware,
  blogController.listBlogs.bind(blogController),
);

/**
 * @swagger
 * /api/v1/blog/{id}:
 *   put:
 *     summary: Edit a blog post by ID
 *     description: Allow an author to edit a blog post by ID (requires authentication)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogInput'
 *     responses:
 *       '200':
 *         description: Blog post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Blog post not found
 *       '500':
 *         description: Server error
 */
blogRouter.put("/:id", authMiddleware, updateBlogController);

/**
 * @swagger
 * /api/v1/blog:
 *   get:
 *     summary: Get all blog posts with pagination
 *     description: Allow auhtorized user to get all blog posts with pagination (page, limit, offset)
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: offset
 *         in: query
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       '200':
 *         description: List of blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       '500':
 *         description: Server error
 */
blogRouter.get("/", authMiddleware, blogController.listBlogs.bind(blogController));


/**
 * @swagger
 * /api/v1/blog/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     description: Allow an author to delete a blog post by ID (requires authentication)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Blog post deleted successfully
 *       '404':
 *         description: Blog post not found
 *       '500':
 *         description: Server error
 */

blogRouter.delete("/:id", blogController.deleteBlogPost.bind(blogController));

export { blogRouter };
