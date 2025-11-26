// // lib/mongodb.ts
// import mongoose, { Mongoose } from "mongoose";

// const MONGODB_URI: string = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable");
// }

// /**
//  * Extend the Node global type to store the cached mongoose connection.
//  */
// declare global {
//   // allow global `mongoose` to be used across hot reloads in Next.js
//   // eslint-disable-next-line no-var
//   var mongoose: {
//     conn: Mongoose | null;
//     promise: Promise<Mongoose> | null;
//   } | undefined;
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect(): Promise<Mongoose> {
//   if (cached!.conn) {
//     return cached!.conn;
//   }

//   if (!cached!.promise) {
//     cached!.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
//   }

//   cached!.conn = await cached!.promise;
//   return cached!.conn;
// }

// export default dbConnect;
