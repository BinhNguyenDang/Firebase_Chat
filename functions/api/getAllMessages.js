// Importing required modules.
// Importing Firebase Functions module.
const functions = require("firebase-functions");
// Importing Firebase Admin module.
const admin = require("firebase-admin");

exports.getAllMessages = functions.https.onCall(async (data, context) =>{
  try {
    // Check if the userId is missing in the input data.
    if (!data.userId) {
      // Throw an HTTP error if userId is missing,
      // indicating an invalid argument.
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Missing userId",
      );
    }

    // Extracting the userId from the input data.
    const {userId} = data;

    // Creating a reference to the user's messages collection in Firestore.
    const messagesRef = admin.firestore().
        collection("users").
        doc(userId).
        collection("messages");

    // Checking if the message document exists in Firestore.
    if (!((await messagesRef.get()).exists)) {
      // Throwing an HTTP error if the message document is not found.
      throw new functions.https.HttpsError("not-found", "Message not found");
    }

    // Fetching all the messages for the user.
    const messages = await messagesRef.get();

    // Returning the fetched messages.
    return {status: "success", messages: messages};
  } catch (error) {
    // Logging any errors that occur during execution.
    console.log(error);

    // Logging the error message using Firebase functions logger.
    functions.logger.log("Error Message: ", error);

    // Throwing an HTTP error indicating that an unknown error occurred.
    throw new functions.https.HttpsError(
        "unknown",
        "An error occurred while adding the message",
        error,
    );
  }
});
