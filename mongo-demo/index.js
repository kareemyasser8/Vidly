const mongoose = require('mongoose');

mongoose.set("strictQuery", false)

mongoose.connect('mongodb://127.0.0.1/mongo-exercises').then(
    () => console.log("Connected to Mongo DB...")
).catch(
    (err) => console.log("Could not connect to MongoDB...", err)
)


const courseSchema = new mongoose.Schema({
    _id: String,
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    price: Number,
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

async function getCourses() {

    //---Comparison Operators

    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte  (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    //--Logical operators
    // or
    // and

    const courses = await Course
        .find({
            _id: "5a68fdf95db93f6477053ddd" })
        // .find({price: {$gte: 10, $lte: 20}})
        // .find({price: {$in: [10,15,20]}})
        //.or([{author: 'Mosh'},{isPublished: true}]) //you will get courses which are author by mosh or the published courses
        //.and ([]) 
        // .find({ author: /^Mosh/ }) //starts with the string Mosh by using caret character ^
        // .find({ author: /Hamadani$/i }) //ends with Hamedani (i) indicates non case senstive
        // .find({ author: /.*Kareem.*/i }) //contains Mosh in anywhere
        .limit(10)
        .sort({ name: 1 }) // 1 means ascending order, -1 means descending order
        // .select({name: 1,tags: 1})
        // .count()
    console.log(courses);
}

async function updateCourse(id){
    const course = await Course.findByIdAndUpdate(id,{
        $set:{
            author: 'JAckyy',
            isPublished: false
        }
    }, {new: true})
    // if(!course){
    //     console.log("Course is not found")
    //     return
    // }
    // course.isPublished = true;
    // course.author = 'Kareem'
    // course.set({
    //     isPublished: true,
    //     author: 'Kareem'
    // })

    // const result = await course.save();
    console.log(course);

}

async function removeCourse(id){
    const result = await Course.deleteOne({ _id: id})
    if(!result){
        console.log("Couldn't find the desired course that you want to delete..")
        return
    }else{
        console.log("Course is removed successfully!!");
        console.log(result);

    }
}

removeCourse('5a68fdf95db93f6477053ddd')

// updateCourse('5a68fdf95db93f6477053ddd');

// createCourse();

// getCourses();