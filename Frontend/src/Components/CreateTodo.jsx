import { useState } from 'react';
const CreateTodo = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '') {
      alert("Title and description can't be empty");
      return;
    }
    fetch("http://localhost:3000/todo",{
      method:"POST",
      body:JSON.stringify({
        title:title,
  description:description
      }),
      headers:{
        "Content-Type": "application/json",
      }
    }).then(async (res)=> {
      if (res.status === 200) {
      const json =await res.json();
      // alert("Todo added")

    addTodo(json.todo);

    setTitle('');
    setDescription('');
  }else {
    alert("Failed to add todo");
  }
})
.catch((error) => {
  console.error("Error:", error);
  alert("An error occurred while adding the todo.");
});
};
  return (
    <div className=' sm:flex sm:gap-4 mb-6'>
        <input  
        className=' mb-2 hover:border-cyan-800 border-2 outline-none p-2 rounded w-[15rem]'
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /> <br />
      <input className=' mb-2 hover:border-cyan-800 border-2 outline-none p-2 rounded w-[15rem]' 
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />  
      <button  type="button" onClick={handleAddTodo} className='bg-cyan-800 p-2 text-white font-semibold rounded'>
        Add a Todo
      </button>
    </div>
  );
}

export default CreateTodo;
