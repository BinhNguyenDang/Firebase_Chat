// Importing required modules.
// Importing Firebase Functions module.
const functions = require("firebase-functions");
// Importing Firebase Admin module.
const admin = require("firebase-admin");

exports.updateMessage = functions.https.onCall(async (data, context) => {
  try {
    // Checking if the userId or messageId is missing in the input data.
    if (!data.userId || !data.messageId || !data.text) {
      // Throwing an HTTP error if userId or messageId is missing,
      // indicating an invalid argument.
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Missing userId or messageId",
      );
    }
    // Extracting the userId and messageId from the input data.
    const {userId, messageId} = data;

    // Creating a reference to the specific message document in Firestore.
    const messageRef = admin.
        firestore().
        collection("chats").
        doc(userId).
        collection("messages").
        doc(messageId);

    // Checking if the message document exists in Firestore.
    if (!((await messageRef.get()).exists)) {
      // Throwing an HTTP error if the message document is not found.
      throw new functions.https.HttpsError(
          "not-found",
          "Message not found",
      );
    }
    // Updating the text field in the message document.
    await messageRef.update({
      text: data.text,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Document successfully updated");
    return {
      status: "success",
      message: (await messageRef.get()).data(),
    };
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
},
);
