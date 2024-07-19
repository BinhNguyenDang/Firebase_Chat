const admin = require("firebase-admin");
admin.initializeApp();

// Import the function from the specific file
const {addMessage} = require("./api/addMessage");
const {deleteMessage} = require("./api/deleteMessage");
const {updateMessage} = require("./api/updateMessage");

// Export the function for deployment
exports.addMessage = addMessage;
exports.deleteMessage = deleteMessage;
exports.updateMessage = updateMessage;
