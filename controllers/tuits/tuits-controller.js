// Import necessary modules and dependencies
import * as tuitsDao from "./tuits-dao.js";

// Define the createTuit function
const createTuit = async (req, res) => {
  try {
    const newTuit = req.body;
    // Initialize properties
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.disliked = false;
    newTuit.dislikes = 0;
    newTuit.replies = 0;
    newTuit.retuits = 0;
    
    // Create a new tuit using the dao function
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    res.json(insertedTuit); // Return the newly created tuit
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the tuit." });
  }
};

// Define the findTuits function
const findTuits = async (req, res) => {
  try {
    const tuits = await tuitsDao.findTuits();
    res.json(tuits); // Return the list of tuits
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching tuits." });
  }
};

// Define the updateTuit function
const updateTuit = async (req, res) => {
  try {
    const tuitIdToUpdate = req.params.tid;
    const updates = req.body;
    
    // Update the tuit using the dao function
    console.log(updates);
    const status = await tuitsDao.updateTuit(tuitIdToUpdate, updates);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the tuit." });
  }
};

// Define the deleteTuit function
const deleteTuit = async (req, res) => {
  try {
    const tuitIdToDelete = req.params.tid; // Fix typo here
    const status = await tuitsDao.deleteTuit(tuitIdToDelete); // Fix typo here
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the tuit." });
  }
};

// Export routes for use in your app
export default (app) => {
  app.post("/api/tuits", createTuit);
  app.get("/api/tuits", findTuits);
  app.put("/api/tuits/:tid", updateTuit);
  app.delete("/api/tuits/:tid", deleteTuit);
};
