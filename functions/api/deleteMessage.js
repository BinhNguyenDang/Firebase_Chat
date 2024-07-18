// Importing required modules.
const functions = require("firebase-functions"); // Importing Firebase Functions module.
const admin = require("firebase-admin"); // Importing Firebase Admin module.

// Defining Firebase Cloud Function named deleteMessage.
exports.deleteMessage = functions.https.onCall(async (data, context) => {
  try {
    // Checking if the userId or messageId is missing in the input data.
    if (!data.userId || !data.messageId) {
      // Throwing an HTTP error if either userId or messageId is missing, indicating an invalid argument.
      throw new functions.https.HttpsError("invalid-argument", "Missing userId or messageId");
    }

    // Extracting the userId and messageId from the input data.
    const {userId, messageId} = data;

    // Creating a reference to the specific message document in Firestore.
    const messageRef = admin.firestore().collection("chats").doc(userId).collection("messages").doc(messageId);

    // Checking if the message document exists in Firestore.
    if (!((await messageRef.get()).exists)) {
      // Throwing an HTTP error if the message document is not found.
      throw new functions.https.HttpsError("not-found", "Message not found");
    }

    // Deleting the message document from Firestore.
    await messageRef.delete();

    // Returning a success status
    return {status: "success"};
  } catch (error) {
    // Logging any errors that occur during execution.
    console.log(error);

    // Logging the error message using Firebase functions logger.
    functions.logger.log("Error Message: ", error);

    // Throwing an HTTP error indicating that an unknown error occurred.
    throw new functions.https.HttpsError(
        "unknown",
        "An error occurred while adding the message",
        error, // Including the error object in the response for debugging purposes.
    );
  }
});
