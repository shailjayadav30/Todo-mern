
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://shailjayadav7275:UWHADogGLEv43TUv@cluster0.tbezj.mongodb.net/newtodos")

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: {
    type:Boolean,
    default:false
  },
});

const Todo = mongoose.model("todos", todoSchema);

module.exports = { Todo };