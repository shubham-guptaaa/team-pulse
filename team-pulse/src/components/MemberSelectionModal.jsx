import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, switchRole } from "../redux/slices/roleSlice";

const MemberSelectionModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.list);
  const teamMembers = members.filter((member) => member.role === "TeamMember");

  const handleSelectMember = (member) => {
    dispatch(setUser(member));
    dispatch(switchRole("TeamMember"));
    onClose();
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is outside the modal content, call onClose
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    // Add the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm"
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Select a Team Member
        </h3>
        <ul className="space-y-2">
          {teamMembers.map((member) => (
            <li key={member.id}>
              <button
                onClick={() => handleSelectMember(member)}
                className="w-full text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {member.name}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MemberSelectionModal;