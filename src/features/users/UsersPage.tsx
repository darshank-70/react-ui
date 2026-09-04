import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/users.service';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // The component should care about:

  // "Give me users."

  // It shouldn't care about:

  // "What URL? Which HTTP library? Which headers? How is the response parsed?"
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch('https://dummyjson.com/users');

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch users');
  //       }

  //       const data = await response.json();

  //       setUsers(data.users);
  //     } catch (error) {
  //       setError('Unable to load users' + error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await userService.getUsers();
      setUsers(response);
      console.log(response, 'response users');
      setLoading(false);
    };

    try {
      fetchUsers();
    } catch (error) {
      setError('Unable to load users' + error);
    }
  }, []);

  const viewUser = (id: number) => {
    navigate(`/users/${id}`);
  };
  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Users</h1>

      {users.map((user) => (
        <div key={user.id}>
          <h2>
            {user.firstName} {user.lastName}
          </h2>

          <p>{user.email}</p>
          <p>Age: {user.age}</p>
          <button onClick={() => viewUser(user.id)}>View User</button>
        </div>
      ))}
    </div>
  );
}

export default UsersPage;
