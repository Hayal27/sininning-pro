const express = require('express');
const { getAllNews, getAllNewsAdmin, getNewsById, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllNews);
router.get('/admin', protect, authorize('owner', 'admin', 'manager', 'content-manager'), getAllNewsAdmin);
router.get('/:id', getNewsById);
router.post('/', protect, authorize('owner', 'admin', 'manager', 'content-manager'), createNews);
router.put('/:id', protect, authorize('owner', 'admin', 'manager', 'content-manager'), updateNews);
router.delete('/:id', protect, authorize('owner', 'admin', 'manager', 'content-manager'), deleteNews);

module.exports = router;
