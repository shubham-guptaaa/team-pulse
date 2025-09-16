import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMemberDetails } from "./redux/slices/membersSlice";
import { setUser, switchRole } from "./redux/slices/roleSlice";

import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import MemberInactivityManager from "./components/MemberInactivityManager";

function App() {
  const dispatch = useDispatch();
  const currentRole = useSelector((state) => state.role.currentRole);
  const currentUser = useSelector((state) => state.role.currentUser);
  const members = useSelector((state) => state.members.list);
  const membersStatus = useSelector((state) => state.members.status);
  const teamMembers = members.filter((member) => member.role === "TeamMember");

  useEffect(() => {
    if (membersStatus === "idle" || !membersStatus) {
      dispatch(fetchMemberDetails());
    }
  }, [membersStatus, dispatch]);

  useEffect(() => {
    if (membersStatus === "succeeded" && members.length > 0 && !currentUser) { 

      const initialUser = members.find((member) => member.role === currentRole);
      if (initialUser) {
        dispatch(setUser(initialUser));
      } else {
        
        dispatch(setUser(members[0]));
        // adjust the currentRole if needed
        if (members[0].role !== currentRole) {
          dispatch(switchRole(members[0].role));
        }
      }
    }
   
    if (
      membersStatus === "succeeded" &&
      members.length > 0 &&
      currentUser &&
      currentUser.role !== currentRole
    ) {
      const targetUser = members.find((member) => member.role === currentRole);
      if (targetUser) {
        dispatch(setUser(targetUser));
      }
    }
  }, [membersStatus, members, currentRole, currentUser, dispatch]);

  if (membersStatus === "loading" || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 w-full">
        Loading application data...
      </div>
    );
  }

  if (membersStatus === "failed") {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-600 dark:text-red-400 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 w-full">
        Failed to load data. Please try again.
      </div>
    );
  }

  return (
    <div
      className="App font-sans w-full min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300" 
    >
      {teamMembers.map((member) => (
        <MemberInactivityManager key={member.id} member={member} />
      ))}
      <div className="w-full flex flex-col flex-grow border-x border-b border-gray-200 dark:border-gray-700 rounded-b-lg shadow-xl bg-white dark:bg-gray-800 overflow-hidden">
        <Header />
        <main className="flex-grow p-5 overflow-auto">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;