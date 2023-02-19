const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/mongo-exercises').then(
    () => console.log("Connected to MongoDB....")
).catch(
    (err) => console.log("Failed to Connect", err)
)

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    price: Number,
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    const courses = await Course
        .find({ isPublished: true })
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/ }
        ])
        .select('name author price')
    console.log(courses);
}

getCourses();