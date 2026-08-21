import { useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { authService } from '../../auth/services/auth.service';
import type { User } from '../../auth/types/auth.type';

function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  const { logout } = useAuth();
  // const changeId = () => {
  //   setUserId(Math.random().toString());
  // };
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  const getMe = async () => {
    const user = await authService.getCurrentUser();
    setUser(user);
  };
  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome {user?.email}</p>{' '}
      <button onClick={getMe}>Get My Details</button>
      {/* User Div */}
      {user && (
        <div>
          <img src={user?.image} alt={user?.firstName} width='128' />

          <h2>
            {user?.firstName} {user?.lastName}
          </h2>

          <p>
            <strong>ID:</strong> {user?.id}
          </p>
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Gender:</strong> {user?.gender}
          </p>

          <h3>Tokens</h3>

          <p>
            <strong>Access Token:</strong>
            <br />
            {user?.accessToken}
          </p>

          <p>
            <strong>Refresh Token:</strong>
            <br />
            {user?.refreshToken}
          </p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default DashboardPage;
