const mongoose = require('mongoose');

mongoose.set("strictQuery", false)

mongoose.connect('mongodb://localhost/playground').then(
    () => console.log("Connected to Mongo DB...")
).catch(
    (err) => console.log("Could not connect to MongoDB...", err)
)

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
