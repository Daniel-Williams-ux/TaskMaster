import { useState } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", priority: "High", dueDate: "2024-11-25" },
    { id: 2, title: "Build TaskMaster", priority: "Medium", dueDate: "2024-12-01" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", priority: "Low", dueDate: "" });

  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");

  // Function to handle task addition or update
  const handleAddTask = () => {
    if (taskToEdit) {
      const updatedTasks = tasks.map((task) =>
        task.id === taskToEdit.id ? { ...task, ...newTask } : task
      );
      setTasks(updatedTasks);
      setTaskToEdit(null);
    } else {
      const updatedTasks = [
        ...tasks,
        { id: tasks.length + 1, ...newTask },
      ];
      setTasks(updatedTasks);
    }
    setNewTask({ title: "", priority: "Low", dueDate: "" });
    setIsModalOpen(false);
  };

  // Function to handle task deletion
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Helper Function for Task Filtering
//   const filterTasks = () => {
//     return tasks.filter((task) => {
//       const matchesSearch = searchQuery
//         .toLowerCase()
//         .split(" ")
//         .every((word) => task.title.toLowerCase().includes(word));
//       const matchesPriority =
//         filterPriority === "All" || task.priority === filterPriority;

//       return matchesSearch && matchesPriority;
//     });
//   };

const filteredTasks = tasks.filter((task) => {
    // Split the search query into words, ignoring empty spaces
    const searchWords = searchQuery
      .toLowerCase()
      .split(" ")
      .filter((word) => word.trim() !== "");
  
    // Check if task matches search query (if search query exists)
    const matchesSearch =
      searchWords.length === 0 || // If no search query, match all tasks
      searchWords.every((word) => task.title.toLowerCase().includes(word));
  
    // Check if task matches priority filter
    const matchesPriority =
      filterPriority === "All" || task.priority === filterPriority;
  
    // Return tasks that match both search and priority
    return matchesSearch && matchesPriority;
    // console.log("Task:", task);
    // console.log("Search Words:", searchWords);
    // console.log("Matches Search:", matchesSearch);
    // console.log("Matches Priority:", matchesPriority);

  });
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Task Dashboard</h2>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            className="border border-gray-300 rounded px-3 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option key="all" value="All">All</option>
            <option key="low" value="Low">Low</option>
            <option key="medium" value="Medium">Medium</option>
            <option key="high" value="High">High</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{task.title}</h3>
                <p className="text-sm text-gray-600">Priority: {task.priority}</p>
                <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setTaskToEdit(task);
                    setNewTask(task);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No tasks available.</p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-xl font-bold mb-4">{taskToEdit ? "Edit Task" : "Add New Task"}</h3>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Task Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Due Date</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setTaskToEdit(null);
                  setNewTask({ title: "", priority: "Low", dueDate: "" });
                }}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>

              <button
                onClick={handleAddTask}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {taskToEdit ? "Update Task" : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;