const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

mongoose.connect('mongodb://127.0.0.1/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    author: authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
 const course = await Course.updateOne({_id: courseId}, {
  $unset:{
    'authors': ''
  }
 })
}

// updateAuthor('63f51c39f24ee8ff8b1951ce')
createCourse('Node Course', [
  new Author({ name: 'Mosh' }),
  new Author({ name: 'John' }),
  new Author({ name: 'Kareem' }),
]);
