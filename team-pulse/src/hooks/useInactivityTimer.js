import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { updateMemberStatus } from '../redux/slices/membersSlice.js';

const useInactivityTimer = (member) => {
  const dispatch = useDispatch();

  const taskProgressSignature = useMemo(() => {
    return member.tasks.map(task => task.progress).join(',');
  }, [member.tasks]);

  useEffect(() => {
    if (member.currentStatus === 'Offline') {
      return;
    }

    const timerId = setTimeout(() => {
      console.log(`Member ${member.name} is now offline due to inactivity.`);
      dispatch(updateMemberStatus({ memberId: member.id, status: 'Offline' }));
    }, 60000); 

    return () => {
      clearTimeout(timerId);
    };
  }, [member.currentStatus, taskProgressSignature, dispatch, member.id, member.name]);
};

export default useInactivityTimer;