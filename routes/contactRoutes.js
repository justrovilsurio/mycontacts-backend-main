const express = require('express');
const router = express.Router();
const {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

// to make routes protected
router.use(validateToken);
// router.route("/").get(getContacts).post(createContact);
router.route("/").get(getContacts);

router.route("/").post(createContact);

// router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;