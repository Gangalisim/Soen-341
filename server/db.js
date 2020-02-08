const { MongoClient } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//List the databases in our cluster.
async function listDatabases(client) {
    await client.connect();
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

//Create a new user for the memestagram database.
async function createUser(client, newUser) {
    await client.connect();
    const result = await client.db("memestagram").collection("users").insertOne(newUser);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
/* Example of how this method would be called:
await createUser(client,
            {
                username: "<username>",
                email: "<email>",
                password: "<password>"
            }
        );
*/

//Read users collection for a specific user.
async function findOneUserByName(client, nameOfUser) {
    await client.connect();
    result = await client.db("memestagram").collection("users").findOne({ name: nameOfUser }
    );

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfUser}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfUser}'`);
    }
}
/* Example of how this method would be called
await findOneUserByName(client, "greg34910");
*/

module.exports = {
    listDatabases,
    createUser,
    findOneUserByName
}