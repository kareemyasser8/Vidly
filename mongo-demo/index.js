const mongoose = require('mongoose');

mongoose.set("strictQuery", false)

mongoose.connect('mongodb://127.0.0.1/playground').then(
    () => console.log("Connected to Mongo DB...")
).catch(
    (err) => console.log("Could not connect to MongoDB...", err)
)

//async function ConnectToMongo(){
//    try {
//        await mongoose.connect('mongodb://127.0.0.1:27017/test');
//      } catch (error) {
//        handleError(error);
//      }
//}

//ConnectToMongo();


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

//Classes and objects
//Human, John

const Course = mongoose.model('Course', courseSchema)

async function createCourse() {

    const course = new Course({
        name: "Node.js Course",
        author: "Kareem",
        tags: ['node', 'backend'],
        isPublished: true
    })

    const result = await course.save();
    console.log(result)
}

createCourse();
