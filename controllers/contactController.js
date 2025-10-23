// to catch errors in async functions we will use a middeware called express-async-handler package
// this eliminateds the need of try catch block in each function
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// whenever we interact with mongodb and mongoose, we receive a promise

//@desc Get all contacts
//@route GET /api/contacts
//@access Private --  this will be private when we implement authentication

const getContacts = asyncHandler (async (req, res) => {
    // {user_id: req.user.id} this part specifies that we only want to get contacts for the logged in user
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST /api/contacts
//@access Private --  this will be private when we implement authentication

const createContact = asyncHandler (async (req, res) => {
    const {name, email, phone} = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    // creating the contact object in the database
    const contact = await Contact.create({
        name,
        email,
        phone,
        //associate userId who created this contact
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/id
//@access Private --  this will be private when we implement authentication

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // check if the logged in user matches the contact user_id
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user's contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
    

    res.status(200).json(updatedContact);
});

//@desc Get contact
//@route GET /api/contacts/id
//@access Private --  this will be private when we implement authentication

const getContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
});

//@desc Deletecontact
//@route DELETE /api/contacts/id
//@access Private --  this will be private when we implement authentication

const deleteContact = asyncHandler(async (req, res) => {

    // const contact = await Contact.findByIdAndDelete(req.params.id); 
    const contact = await Contact.findById(req.params.id); 

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // check if the logged in user matches the contact user_id
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user's contact");
    }


    await Contact.deleteOne({_id: req.params.id});
     res.status(200).json(contact);
});


module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact
};