import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const MongoClient = mongodb.MongoClient;

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = encodeURIComponent(process.env.MONGO_PASSWORD); // URL-encode the password
const cluster_name = "cluster0"; // Replace with your MongoDB cluster name
const dbname = "your_database_name"; // Replace with your database name

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@${cluster_name}.jlcsq8x.mongodb.net/${dbname}?retryWrites=true&w=majority`;

console.log(`Connecting to MongoDB with URI: ${uri}`);

const port = 8000;

MongoClient.connect(uri, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useUnifiedTopology: true
})
.catch(err => {
    console.error("Failed to connect to MongoDB", err.stack);
    process.exit(1);
})
.then(async client => {
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
});
