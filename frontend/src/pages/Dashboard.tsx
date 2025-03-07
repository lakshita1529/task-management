import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios"; // ✅ Import AxiosError
import { Container, Button, Form, ListGroup, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

interface Task {
  id: number;
  title: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Fetch tasks error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Add or Update Task
// ✅ Add userId when saving a task
const handleSave = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.id;

    if (!userId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    if (!title || !description) {
      toast.error("Title and description are required.");
      return;
    }

    if (editingTask) {
      await axios.put(`http://localhost:5000/api/tasks/${editingTask.id}`, {
        title,
        description,
      });
      toast.success("Task updated successfully!");
    } else {
      await axios.post("http://localhost:5000/api/tasks", {
        title,
        description,
        userId, // ✅ Ensure userId is included
      });
      toast.success("Task added successfully!");
    }

    fetchTasks();
    setShowModal(false);
    setTitle("");
    setDescription("");
    setEditingTask(null);
  } catch (error) {
    // ✅ Cast `error` to `AxiosError` for better TypeScript support
    const axiosError = error as AxiosError;
    console.error("Task Save Error:", axiosError.response?.data || axiosError.message);
    toast.error("Failed to save task.");
  }
};

  // ✅ Delete Task
  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      toast.success("Task deleted!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Task List</h2>

      <Button variant="primary" onClick={() => setShowModal(true)}>Add Task</Button>

      {/* Task List */}
      <ListGroup className="mt-4">
        {tasks.map((task) => (
          <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{task.title}</strong> - {task.description}
            </div>
            <div>
              <Button
                variant="warning"
                className="me-2"
                onClick={() => {
                  setEditingTask(task);
                  setTitle(task.title);
                  setDescription(task.description);
                  setShowModal(true);
                }}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => deleteTask(task.id)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Task Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTask ? "Edit Task" : "Add Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
              />
            </Form.Group>
            <Button variant="success" onClick={handleSave}>
              {editingTask ? "Update Task" : "Add Task"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;
