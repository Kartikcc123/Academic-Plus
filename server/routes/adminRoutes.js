const express = require('express');
const router = express.Router();
const { loginAdmin, updateAdminProfile, createNewAdmin } = require('../controllers/adminAuthController');
const { protectAdmin } = require('../middleware/adminMiddleware'); // Bring in the bouncer!

router.post('/login', loginAdmin);

// These routes require you to ALREADY be logged in as an admin to use them
router.put('/profile', protectAdmin, updateAdminProfile);
router.post('/create-admin', protectAdmin, createNewAdmin);

module.exports = router;