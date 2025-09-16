import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import StatusSelector from "./StatusSelector";
import TaskList from "./TaskList";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TeamMemberDashboard = () => {
  const currentUser = useSelector((state) => state.role.currentUser);
  const members = useSelector((state) => state.members.list);
  const membersStatus = useSelector((state) => state.members.status);

  // Find the current member's details from the members list
  const currentMemberDetails = useMemo(() => {
    return members.find((m) => m.id === currentUser?.id);
  }, [members, currentUser]);

  // Calculate task completion metrics for the chart
  const taskMetrics = useMemo(() => {
    const totalTasks = currentMemberDetails?.tasks?.length || 0;
    const completedTasks =
      currentMemberDetails?.tasks?.filter((task) => task.isCompleted).length ||
      0;
    return {
      labels: ["Tasks Completed", "Tasks Remaining"],
      datasets: [
        {
          label: "Task Status",
          data: [completedTasks, totalTasks - completedTasks],
          backgroundColor: ["#28a745", "#dc3545"],
          borderColor: ["#28a745", "#dc3545"],
          borderWidth: 1,
        },
      ],
    };
  }, [currentMemberDetails]);

  if (membersStatus === "loading" || !currentUser) {
    return (
      <div className="text-center mt-12 text-gray-600 dark:text-gray-400">
        Loading your dashboard...
      </div>
    );
  }

  if (!currentMemberDetails) {
    return (
      <div className="text-center mt-12 text-red-600 dark:text-red-400">
        Could not find your member details.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center mb-8">
        Welcome, {currentUser.name}! (Team Member)
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Tasks List */}
        <section className="lg:col-span-2 flex flex-col min-h-[400px]">
          <div className="flex-grow bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 overflow-hidden">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
              Your Tasks
            </h3>
            <TaskList
              tasks={currentMemberDetails.tasks}
              memberId={currentMemberDetails.id}
            />
          </div>
        </section>

        {/* Right Column: Status and Metrics */}
        <aside className="lg:col-span-1 flex flex-col gap-6">
          {/* Status Card */}
          <div className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 min-h-[150px] flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
              Your Status
            </h3>
            <StatusSelector
              memberId={currentMemberDetails.id}
              currentStatus={currentMemberDetails.currentStatus}
            />
          </div>

          {/* Task Metrics Chart Card */}
          <div className="flex-grow bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 min-h-[300px] flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
              Your Task Metrics
            </h3>
            <div className="relative w-full h-64">
              <Bar
                data={taskMetrics}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        color: "rgb(107, 114, 128)",
                      },
                    },
                    title: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        color: "rgb(107, 114, 128)",
                      },
                      grid: {
                        color: "rgba(229, 231, 235, 0.2)",
                      },
                    },
                    y: {
                      beginAtZero: true,
                      ticks: {
                        color: "rgb(107, 114, 128)",
                        stepSize: 1,
                      },
                      grid: {
                        color: "rgba(229, 231, 235, 0.2)",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TeamMemberDashboard;
