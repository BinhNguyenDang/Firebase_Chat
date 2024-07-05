const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {logger} = functions;

exports.addMessage = functions.https.onCall(async (data, context) => {
  try {
    logger.log("Received message request data:", data);

    // Validate required fields
    if (!data.text || !data.userId) {
      logger.log("Required fields (text or userId) are missing");
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Missing required fields");
    }
    const {text, userId} = data;
    // Construct message data
    const messageData = {
      text,
      userId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };
    // Add message to the user's message subcollection in Firestore
    const messageRef = await admin
        .firestore()
        .collection("chats")
        .doc(userId)
        .collection("messages")
        .add(messageData);
    logger.log("Message added successfully, message ID:", messageRef.id);
    // Return success status and message ID
    return {
      status: "Success",
      messageId: messageRef.id,
    };
  } catch (error) {
    logger.error("Error adding message:", error);
    throw new functions.https.HttpsError(
        "unknown",
        "An error occurred while adding message",
        error.message);
  }
});
