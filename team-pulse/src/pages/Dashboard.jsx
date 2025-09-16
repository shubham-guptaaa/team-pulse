import React from "react";
import { useSelector } from "react-redux";
import TeamLeadDashboard from "../components/TeamLeadDashboard";
import TeamMemberDashboard from "../components/TeamMemberDashboard";

const Dashboard = () => {
  const currentRole = useSelector((state) => state.role.currentRole);
  const currentUser = useSelector((state) => state.role.currentUser);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)] text-xl text-gray-700 dark:text-gray-300 transition-colors duration-300">
        {" "}
        Loading Dashboard Content...
      </div>
    );
  }
  return (
    <div className="flex-grow p-4 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-6rem)] transition-colors duration-300">
      {currentRole === "TeamLead" ? (
        <TeamLeadDashboard />
      ) : (
        <TeamMemberDashboard />
      )}
    </div>
  );
};

export default Dashboard;
