## Firebase Cloud Functions - Add Message
## Overview
- This Firebase Cloud Function is designed to add a message to a user's message subcollection in Firestore. The function is triggered via an HTTPS call and expects certain data fields to be provided. Upon successful execution, it stores the message in Firestore and returns a success status along with the message ID.
## Prerequisites
- Firebase project with Firestore enabled.
- Firebase CLI installed and configured.
- Node.js environment set up.
## Setup Instructions
1. Install Firebase CLI:
- If you haven't already, install the Firebase CLI:
```
npm install -g firebase-tools
```
2. Initialize Firebase Functions:
- Navigate to your Firebase project directory and initialize Firebase functions if not already done:
```
firebase init functions
```
3. Install Dependencies:
- In your functions directory, install the required Node.js dependencies:
```
cd functions
npm install firebase-functions firebase-admin
```
4. Deploy the Function:
- Deploy your function to Firebase:
```
firebase deploy --only functions
```
# Function Details
## addMessage
- This function adds a message to the user's message subcollection in Firestore.
## Endpoint
- URL: The function is deployed as an HTTPS callable function. The exact URL will be provided by Firebase upon deployment.
## Request
The function expects a JSON payload with the following fields:

- text (string): The message text to be stored.
- userId (string): The ID of the user to whom the message belongs.
## Response
- Success:

- status (string): "Success"
- messageId (string): The ID of the newly added message.
## Error:

- code (string): Error code (e.g., "invalid-argument", "unknown")
- message (string): Error message describing the issue.





