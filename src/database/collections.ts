import { client } from "./index.js";

const db = client.db("BookBridgeDB");

// Collections
export const usersCollection = db.collection("users");

export const postsCollection = db.collection("posts");

export const bookRequestsCollection = db.collection("bookRequests");

export const publishersCollection = db.collection("publishers");

export const pendingPublishersCollection = db.collection("pendingPublishers");
