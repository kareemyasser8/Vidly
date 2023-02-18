const mongoose = require('mongoose');

mongoose.set("strictQuery", false) 

mongoose.connect('mongodb://127.0.0.1/playground').then(
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

const Course = mongoose.model('Course', courseSchema); //we get a Course class in our application

async function createCourse() {
    
    const course = new Course({
        name: 'Redux Course',
        author: 'Kareem',
        tags: ['react', 'front-end'],
        isPublished: true
    })

    //once we have a schema, we need to compile that in a model in order to have a class.
    //then we create an object based on that class, and this object maps to a document in a mongo DB database


    const result = await course.save();
    console.log(result)

}

async function getCourses(){

    //---Comparison Operators

    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte  (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)



    const courses = await Course
    // .find({author: 'Kareem', isPublished: true })
    // .find({price: {$gte: 10, $lte: 20}})
    .find({price: {$in: [10,15,20]}})
    .limit(10)
    .sort({name: 1}) // 1 means ascending order, -1 means descending order
    .select({name: 1,tags: 1})
    console.log(courses);
}

getCourses();