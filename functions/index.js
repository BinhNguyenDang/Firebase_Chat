const admin = require("firebase-admin");
admin.initializeApp();

// Import the function from the specific file
const {addMessage} = require("./api/addMessage");
const {deleteMessage} = require("./api/deleteMessage");
const {updateMessage} = require("./api/updateMessage");
const {getMessage} = require("./api/getMessage");
const {getAllMessages} = require("./api/getAllMessages");


// Export the function for deployment
exports.addMessage = addMessage;
exports.deleteMessage = deleteMessage;
exports.updateMessage = updateMessage;
exports.getMessage = getMessage;
exports.getAllMessages = getAllMessages;
