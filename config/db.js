// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/my-game", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB 연결 성공");
//   } catch (error) {
//     console.error("MongoDB 연결 실패:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Successfully connected!");

    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);

    // 모든 데이터베이스 목록 가져오기
    const admin = client.db().admin();
    const databases = await admin.listDatabases();

    console.log('All Databases:');
    databases.databases.forEach(db => {
      console.log(`- ${db.name}`);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);