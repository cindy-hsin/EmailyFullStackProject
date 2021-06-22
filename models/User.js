const mongoose = require('mongoose');
const { Schema }  = mongoose; // ES2015 Destructuring assignment: equivalent to: const Schema = mongoose.Schema;

// Mongoose wants to know ahead of time all the fields we might have.
// Schema describes the structure of a single record/document.
const userSchema = new Schema({
  googleId: String                // String type.
})

mongoose.model('users', userSchema);  // Loads the model class. Makes a copy of all we defiend on the schema, and it also contains all Mongoose methods we will use to interact with MongoDB.
// Mongoose will only create this new collection if it doesn't exist already. Won't override exisitng collection.
