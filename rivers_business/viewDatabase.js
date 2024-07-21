const { MongoClient } = require('mongodb');

async function listCollections(client, dbName) {
  const db = client.db(dbName);
  const collections = await db.listCollections().toArray();
  console.log(`Collections in the ${dbName} database:`);
  collections.forEach(collection => console.log(` - ${collection.name}`));
}

async function main() {
  const uri = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
  const dbName = "riverStateBusinessSchool"; // The name of the database you want to view

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    await listCollections(client, dbName);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

