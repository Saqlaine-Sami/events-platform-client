import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// dev-এ hot reload হলে বারবার নতুন client না বানাতে global-এ রাখা হচ্ছে
const globalForMongo = globalThis;
const client = globalForMongo._mongoClient ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}

export const db = client.db(process.env.MONGODB_DB || "events_auth_db");
export { client };