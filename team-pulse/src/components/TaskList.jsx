import React from "react";
import { useDispatch } from "react-redux";
import { updateTaskProgress } from "../redux/slices/membersSlice";

const TaskList = ({ tasks, memberId }) => {
  const dispatch = useDispatch();

  const handleProgressChange = (taskId, change) => {
    dispatch(updateTaskProgress({ memberId, taskId, increment: change }));
  };

  if (!tasks || tasks.length === 0) {
    return (
      <p className="text-center text-lg text-gray-600 dark:text-gray-400 mt-8">
        No tasks assigned yet.
      </p>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
      {tasks.map((task) => (
        <div
          key={task.taskId}
          className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-600 transition-colors duration-300 flex flex-col"
        >
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {task.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Due Date: {task.dueDate}
          </p>
          <div className="mb-3">
            <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              <span>Progress:</span>
              <span>{task.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: `${task.progress}%`,
                  backgroundColor: task.isCompleted ? "#28a745" : "#007bff",
                }}
              ></div>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-auto">
            <button
              onClick={() => handleProgressChange(task.taskId, -10)}
              disabled={task.progress === 0}
              className={`px-3 py-1 text-sm rounded-md transition duration-200
                ${
                  task.progress === 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
                }
                focus:outline-none focus:ring-2 focus:ring-opacity-50
              `}
            >
              -10%
            </button>
            <button
              onClick={() => handleProgressChange(task.taskId, 10)}
              disabled={task.progress === 100}
              className={`px-3 py-1 text-sm rounded-md transition duration-200
                ${
                  task.progress === 100
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500"
                }
                focus:outline-none focus:ring-2 focus:ring-opacity-50
              `}
            >
              +10%
            </button>
            {task.isCompleted && (
              <span className="ml-auto px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full flex items-center">
                Completed
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;