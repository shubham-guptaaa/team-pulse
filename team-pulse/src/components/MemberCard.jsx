import React from "react";

const MemberCard = ({ member }) => {
  const getStatusClasses = (status) => {
    switch (status) {
      case "Working":
        return "bg-green-500 text-white";
      case "Offline":
        return "bg-amber-500 text-white";
      case "In Meeting":
        return "bg-red-500 text-white";
      case "On Break":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const totalTasks = member.tasks.length;
  const completedTasks = member.tasks.filter((task) => task.isCompleted).length;

  const totalProgress = member.tasks.reduce(
    (sum, task) => sum + task.progress,
    0
  );
  const completionPercentage =
    totalTasks > 0 ? (totalProgress / totalTasks).toFixed(0) : 0;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4 flex flex-col space-y-3 transition-colors duration-300 max-h-64 overflow-y-auto custom-scrollbar">
      <div className="flex items-center space-x-3">
        <img
          src={
            member.picture ||
            `https://via.placeholder.com/50/a0aec0/ffffff?text=${member.name[0]}`
          }
          alt={member.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-400 dark:border-blue-300"
        />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {member.name}
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
        Email: {member.email}
      </p>
      <div className="flex items-center">
        <span className="font-medium mr-2 text-gray-700 dark:text-gray-200">
          Status:
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(
            member.currentStatus
          )}`}
        >
          {member.currentStatus}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Tasks Completed: <span className="font-semibold">{completedTasks}</span>
        /<span className="font-semibold">{totalTasks}</span> (
        <span className="font-bold text-red-600 dark:text-red-400">
          {completionPercentage}%
        </span>
        )
      </p>
    </div>
  );
};

export default MemberCard;