
const AllTasksList = ({ members }) => {
  const allTasks = members.flatMap((member) =>
    member.tasks.map((task) => ({ ...task, memberName: member.name }))
  );

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        All Assigned Tasks
      </h3>
      <div className="space-y-4">
        {allTasks.length > 0 ? (
          allTasks.map((task) => (
            <div
              key={task.taskId}
              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md"
            >
              <p className="font-semibold">{task.title}</p>
              <p className="text-sm text-gray-500">
                Assigned to: {task.memberName}
              </p>
              <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600 mt-2">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tasks have been assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default AllTasksList;