import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserPreferencesState {
  search: string;
}
const initialState: UserPreferencesState = {
  search: '',
};

const userPreferencesSlice = createSlice({
  initialState,
  name: 'userPreferences',
  reducers: {
    setSearch: (state: UserPreferencesState, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});
export const { setSearch } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
