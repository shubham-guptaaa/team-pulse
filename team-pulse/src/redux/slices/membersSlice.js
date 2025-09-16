import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

export const fetchMemberDetails = createAsyncThunk(
  `members/fetchMemberDetails`,
  async () => {
    const numOfUsers = 8;
    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=${numOfUsers}&inc=login,name,email,picture`
      );
      const data = await response.json();

      const members = data.results.map((user, index) => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        picture: user.picture.thumbnail,
        role: index === 0 ? `TeamLead` : `TeamMember`,
        currentStatus: `Offline`,
        tasks: [],
      }));
      
      return members;
    } catch (error) {
      console.error(`Failed to fetch details at the moment ${error}`);
      throw error;
    }
  }
);

const membersSlice = createSlice({
  name: `members`,
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateMemberStatus: (state, action) => {
      const { memberId, status } = action.payload;
      const member = state.list.find((m) => m.id === memberId);
      if (member) {
        member.currentStatus = status;
      }
    },
    assignTask: (state, action) => {
      const { memberId, title, dueDate } = action.payload;
      const member = state.list.find((m) => m.id === memberId);
      if (member) {
        const newTask = {
          taskId: nanoid(),
          title,
          dueDate,
          progress: 0,
          isCompleted: false,
        };
        member.tasks.push(newTask);
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberId, taskId, increment } = action.payload;
      const member = state.list.find((m) => m.id === memberId);
      if (member) {
        const task = member.tasks.find((t) => t.taskId === taskId);
        if (task) {
          task.progress = Math.max(0, Math.min(100, task.progress + increment));
          task.isCompleted = task.progress === 100;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemberDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMemberDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchMemberDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateMemberStatus, assignTask, updateTaskProgress } =
  membersSlice.actions;
export default membersSlice.reducer;