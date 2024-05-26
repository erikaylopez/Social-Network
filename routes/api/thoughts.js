const router = require('express').Router();


// Import all of the API routes from /api/index.js
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);


router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);



// Set up POST at /api/thoughts/:id/reactions
router
    .route('/:id/reactions')
    .post(addReaction);


 // Set up DELETE at /api/thoughts/:id/reactions/:reactionId   
router
    .route('/:id/reactions/:reactionId')
    .delete(deleteReaction);


// Export the router    
module.exports = router;