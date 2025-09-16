import React from "react";
import { useDispatch } from "react-redux";
import { updateMemberStatus } from "../redux/slices/membersSlice";

const StatusSelector = ({ memberId, currentStatus }) => {
  const dispatch = useDispatch();

  const statuses = ["Working", "Offline", "In Meeting", "On Break"];

  const getStatusColorClass = (status) => {
    switch (status) {
      case "Working":
        return "bg-green-500";
      case "Offline":
        return "bg-amber-500";
      case "In Meeting":
        return "bg-red-500";
      case "On Break":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    dispatch(updateMemberStatus({ memberId, status: newStatus }));
  };

  return (
    <div className="flex flex-col items-center p-2 rounded-lg text-white w-full">
      <label
        htmlFor="status-dropdown"
        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
      >
        Update Your Status:
      </label>
      <select
        id="status-dropdown"
        value={currentStatus}
        onChange={handleStatusChange}
        className={`w-full py-3 px-4 rounded-md text-center font-bold text-lg shadow-md appearance-none cursor-pointer transition-colors duration-300
          ${getStatusColorClass(currentStatus)}
          text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3e%3cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3e%3c/svg%3e")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "1.5em 1.5em",
        }}
      >
        {statuses.map((status) => (
          <option
            key={status}
            value={status}
            className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
          >
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusSelector;