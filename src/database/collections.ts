import type { Post } from "../types/post.types.js";
import { client } from "./index.js";

const db = client.db("BookBridgeDB");

// Collections
export const userCollection = db.collection("user");

export const userProfileCollection = db.collection("userProfile");

export const sessionCollection = db.collection("session");

export const postsCollection = db.collection<Post>("posts");

export const bookRequestsCollection = db.collection("bookRequests");

export const publishersCollection = db.collection("publishers");

export const pendingPublishersCollection = db.collection("pendingPublishers");
