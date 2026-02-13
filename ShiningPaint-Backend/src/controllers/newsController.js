const { pool } = require('../config/database');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

// @desc    Get all news
// @route   GET /api/news
// @access  Public
const getAllNews = async (req, res) => {
    try {
        const [news] = await pool.execute('SELECT * FROM news WHERE is_published = true ORDER BY published_at DESC');

        // Parse images JSON for each news item
        const newsWithImages = news.map(item => ({
            ...item,
            images: item.images ? JSON.parse(item.images) : []
        }));

        res.status(200).json({ success: true, data: newsWithImages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get all news (Admin)
// @route   GET /api/news/admin
// @access  Private (Admin/Manager)
const getAllNewsAdmin = async (req, res) => {
    try {
        const [news] = await pool.execute('SELECT * FROM news ORDER BY created_at DESC');

        // Parse images JSON for each news item
        const newsWithImages = news.map(item => ({
            ...item,
            images: item.images ? JSON.parse(item.images) : []
        }));

        res.status(200).json({ success: true, data: newsWithImages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single news
// @route   GET /api/news/:id
// @access  Public
const getNewsById = async (req, res) => {
    try {
        const [news] = await pool.execute('SELECT * FROM news WHERE id = ?', [req.params.id]);
        if (news.length === 0) {
            return res.status(404).json({ success: false, message: 'News not found' });
        }

        // Parse images JSON
        const newsItem = {
            ...news[0],
            images: news[0].images ? JSON.parse(news[0].images) : []
        };

        res.status(200).json({ success: true, data: newsItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create news with multiple images
// @route   POST /api/news
// @access  Private (Admin/Manager)
const createNews = async (req, res) => {
    try {
        const { title, summary, content, category, author, is_published } = req.body;

        // Debug logging
        console.log('Creating news - is_published received:', is_published);
        console.log('is_published type:', typeof is_published);

        if (!title || !content) {
            return res.status(400).json({ success: false, message: 'Please provide title and content' });
        }

        // Handle multiple image uploads
        let imageUrls = [];
        if (req.files && req.files.images) {
            const uploadPath = path.join(__dirname, '../../uploads/news');

            // Ensure upload directory exists
            try {
                await fs.access(uploadPath);
            } catch {
                await fs.mkdir(uploadPath, { recursive: true });
            }

            // Handle multiple files
            const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

            for (const file of files) {
                if (file) {
                    // Validate file type
                    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                    if (!allowedTypes.includes(file.mimetype)) {
                        continue; // Skip invalid files
                    }

                    const fileExtension = path.extname(file.name);
                    const fileName = `news_${uuidv4()}${fileExtension}`;
                    const filePath = path.join(uploadPath, fileName);

                    await file.mv(filePath);
                    imageUrls.push(`/uploads/news/${fileName}`);
                }
            }
        }

        const [result] = await pool.execute(
            'INSERT INTO news (title, summary, content, images, category, author, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                title,
                summary || null,
                content,
                JSON.stringify(imageUrls),
                category || 'general',
                author || 'Admin',
                is_published === 'true' || is_published === true || is_published === 1
            ]
        );

        res.status(201).json({
            success: true,
            message: 'News created successfully',
            data: { id: result.insertId, title, summary, content, images: imageUrls, category, author }
        });
    } catch (error) {
        console.error('Create news error:', error);
        res.status(500).json({ success: false, message: error.message || 'Server Error' });
    }
};

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private (Admin/Manager)
const updateNews = async (req, res) => {
    try {
        const { title, summary, content, category, author, is_published, removeImages } = req.body;

        const [news] = await pool.execute('SELECT * FROM news WHERE id = ?', [req.params.id]);
        if (news.length === 0) {
            return res.status(404).json({ success: false, message: 'News not found' });
        }

        // Get existing images
        let existingImages = news[0].images ? JSON.parse(news[0].images) : [];

        // Remove specified images if requested
        if (removeImages) {
            const imagesToRemove = JSON.parse(removeImages);
            existingImages = existingImages.filter(img => !imagesToRemove.includes(img));

            // Delete files from disk
            for (const imgPath of imagesToRemove) {
                try {
                    const fullPath = path.join(__dirname, '../../', imgPath);
                    await fs.unlink(fullPath);
                } catch (err) {
                    console.error('Failed to delete image:', err);
                }
            }
        }

        // Handle new image uploads
        if (req.files && req.files.images) {
            const uploadPath = path.join(__dirname, '../../uploads/news');

            try {
                await fs.access(uploadPath);
            } catch {
                await fs.mkdir(uploadPath, { recursive: true });
            }

            const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

            for (const file of files) {
                if (file) {
                    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                    if (!allowedTypes.includes(file.mimetype)) {
                        continue;
                    }

                    const fileExtension = path.extname(file.name);
                    const fileName = `news_${uuidv4()}${fileExtension}`;
                    const filePath = path.join(uploadPath, fileName);

                    await file.mv(filePath);
                    existingImages.push(`/uploads/news/${fileName}`);
                }
            }
        }

        await pool.execute(
            'UPDATE news SET title = ?, summary = ?, content = ?, images = ?, category = ?, author = ?, is_published = ? WHERE id = ?',
            [
                title || news[0].title,
                summary !== undefined ? summary : news[0].summary,
                content || news[0].content,
                JSON.stringify(existingImages),
                category || news[0].category,
                author || news[0].author,
                is_published !== undefined ? (is_published === 'true' || is_published === true || is_published === 1) : news[0].is_published,
                req.params.id
            ]
        );

        res.status(200).json({ success: true, message: 'News updated successfully' });
    } catch (error) {
        console.error('Update news error:', error);
        res.status(500).json({ success: false, message: error.message || 'Server Error' });
    }
};

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private (Admin/Manager)
const deleteNews = async (req, res) => {
    try {
        // Get news to delete associated images
        const [news] = await pool.execute('SELECT images FROM news WHERE id = ?', [req.params.id]);

        if (news.length > 0 && news[0].images) {
            const images = JSON.parse(news[0].images);

            // Delete image files
            for (const imgPath of images) {
                try {
                    const fullPath = path.join(__dirname, '../../', imgPath);
                    await fs.unlink(fullPath);
                } catch (err) {
                    console.error('Failed to delete image:', err);
                }
            }
        }

        const [result] = await pool.execute('DELETE FROM news WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'News not found' });
        }
        res.status(200).json({ success: true, message: 'News deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    getAllNews,
    getAllNewsAdmin,
    getNewsById,
    createNews,
    updateNews,
    deleteNews
};
