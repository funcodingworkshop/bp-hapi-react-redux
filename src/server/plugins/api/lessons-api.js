import mongoose from 'mongoose';
import { HTTP_ERROR_400, createError } from '../../constants';

const lessonSchema = mongoose.Schema({
  name: String,
  video_link: String,
  task: String,
  comment: String,
  checked: Boolean,
  course_key: String
});

lessonSchema.set('timestamps', true);
const Lesson = mongoose.model('Lesson', lessonSchema);


//db.lessons.insertOne({ name: "Lesson1", video_link: "testlink.com", task: "some task", comment: "some comment", checked: true, course_key: ObjectId("5b71ca59bf40594bf8dd54b1") })
//{ "_id" : ObjectId("5b7c7a6425adca4ce5afd283"), "name" : "Lesson1", "video_link" : "testlink.com", "task" : "some task", "comment" : "some comment", "checked" : true, "course_key" : ObjectId("5b71ca59bf40594bf8dd54b1") }
//db.courses.update({_id: ObjectId("5b71ca59bf40594bf8dd54b1")},{$set: {lessons: [ObjectId("5b7c7a6425adca4ce5afd283")]}})
