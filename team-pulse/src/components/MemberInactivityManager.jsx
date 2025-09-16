import useInactivityTimer from "../hooks/useInactivityTimer";

const MemberInactivityManager = ({ member }) => {
  useInactivityTimer(member);
  return null;
};

export default MemberInactivityManager;