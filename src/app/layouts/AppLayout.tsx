import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <>
      <header>
        <h2> Devhub</h2>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default AppLayout;
