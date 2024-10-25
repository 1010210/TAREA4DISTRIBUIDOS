"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }
	
  try {
    const client = await clientPromise;

    const publishers = await client.db("bookstore").collection("publishers").find({}).toArray();

    return { statusCode: 200, headers, body: JSON.stringify(publishers)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};