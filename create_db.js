const { MongoClient } = require('mongodb');

async function createDatabase(client, dbName) {
  const db = client.db(dbName);
  const collection = db.collection('riverStateBusinessSchool');
  await collection.insertOne({ testField: 'testValue' });
  console.log(`Database '${dbName}' created with a collection 'testCollection'`);
}

async function main() {
  const uri = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
  const dbName = "riverStateBusinessSchool"; // Replace with the name of the database you want to create

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    await createDatabase(client, dbName);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

