import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { setSearch } from '../store/userPreferencesSlice';

export default function ReduxQueryTestingPage() {
  const dispatch = useAppDispatch();

  const search = useAppSelector((state) => state.userPreferences.search);

  return (
    <div>
      <h1>Redux Query Testing</h1>

      <input
        value={search}
        onChange={(event) => {
          dispatch(setSearch(event.target.value));
        }}
      />

      <p>Search: {search}</p>
    </div>
  );
}
