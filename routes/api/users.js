const router = require('express').Router();

// Import all of the API routes from /api/index.js
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');


// Set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);


// Set up GET one, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


 // Set up POST one and DELETE at /api/users/:id/friends/:friendId   
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);


    // Export the router
module.exports = router;