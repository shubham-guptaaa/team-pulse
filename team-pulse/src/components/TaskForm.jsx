import React, { useState, useRef } from "react"; //
import { useDispatch, useSelector } from "react-redux";
import { assignTask } from "../redux/slices/membersSlice";

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-gray-600 dark:text-gray-300 transition-colors duration-300"
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v3.75H7.5a.75.75 0 0 0 0 1.5h3.75v3.75a.75.75 0 0 0 1.5 0V11.25h3.75a.75.75 0 0 0 0-1.5h-3.75V6Z"
      clipRule="evenodd"
    />
  </svg>
);

const TaskForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.list);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const dueDateInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMemberId || !taskTitle.trim() || !dueDate) {
      alert("Please select a member, enter a task title, and set a due date.");
      return;
    }
    dispatch(
      assignTask({ memberId: selectedMemberId, title: taskTitle, dueDate })
    );
    setTaskTitle("");
    setDueDate("");
    setSelectedMemberId("");
    onClose();
  };

  // Filter out the TeamLead
  const assignableMembers = members.filter(
    (member) => member.role === "TeamMember"
  );

  const handleDueDateClick = () => {
    if (dueDateInputRef.current) {
      if (typeof dueDateInputRef.current.showPicker === "function") {
        dueDateInputRef.current.showPicker();
      } else {
        dueDateInputRef.current.focus();
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300 max-h-[80vh] overflow-y-auto custom-scrollbar">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="member-select"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Select Member:
          </label>
          <select
            id="member-select"
            value={selectedMemberId}
            onChange={(e) => setSelectedMemberId(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 text-sm transition-colors duration-300"
          >
            <option value="">-- Select a member --</option>
            {assignableMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="task-title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Task Title:
          </label>
          <input
            type="text"
            id="task-title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="e.g., Implement User Authentication"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 text-sm transition-colors duration-300"
          />
        </div>
        <div>
          <label
            htmlFor="due-date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Due Date:
          </label>
          <div className="relative flex items-center">
            <input
              type="date"
              id="due-date"
              ref={dueDateInputRef}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              onClick={handleDueDateClick}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 text-sm transition-colors duration-300 pr-10"
            />
            <div className="absolute right-3 pointer-events-none">
              <CalendarIcon />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;