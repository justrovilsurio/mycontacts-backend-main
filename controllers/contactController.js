// to catch errors in async functions we will use a middeware called express-async-handler package
// this eliminateds the need of try catch block in each function
const asyncHandler = require("express-async-handler");


// whenever we interact with mongodb and mongoose, we receive a promise

//@desc Get all contacts
//@route GET /api/contacts
//@access Public --  this will be private when we implement authentication

const getContacts = asyncHandler (async (req, res) => {
    res.status(200).json({ message: "Get all contacts!" });
});

//@desc Create New contact
//@route POST /api/contacts
//@access Public --  this will be private when we implement authentication

const createContact = asyncHandler (async (req, res) => {
    const {name, email, phone} = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    res.status(201).json({ message: "Create Contact" });
});

//@desc Update contact
//@route PUT /api/contacts/id
//@access Public --  this will be private when we implement authentication

const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update contact for ${req.params.id}`});
});

//@desc Get contact
//@route GET /api/contacts/id
//@access Public --  this will be private when we implement authentication

const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Get contact for ${req.params.id}`});
});

//@desc Deletecontact
//@route DELETE /api/contacts/id
//@access Public --  this will be private when we implement authentication

const deleteContact = asyncHandler(async (req, res) => {
     res.status(200).json({message: `Delete contact for ${req.params.id}`});
});


module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact
};