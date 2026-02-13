const express = require('express');
const { getAllCareers, getAllCareersAdmin, getCareerById, createCareer, updateCareer, deleteCareer, applyForJob, getApplications } = require('../controllers/careersController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllCareers);
router.post('/apply', applyForJob);
router.get('/applications', protect, authorize('owner', 'admin', 'manager', 'hr'), getApplications);
router.get('/admin', protect, authorize('owner', 'admin', 'manager', 'hr'), getAllCareersAdmin);
router.get('/:id', getCareerById);
router.post('/', protect, authorize('owner', 'admin', 'manager', 'hr'), createCareer);
router.put('/:id', protect, authorize('owner', 'admin', 'manager', 'hr'), updateCareer);
router.delete('/:id', protect, authorize('owner', 'admin', 'manager', 'hr'), deleteCareer);

module.exports = router;
