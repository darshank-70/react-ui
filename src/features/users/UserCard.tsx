import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { User } from '../auth/types/auth.type';

function UserCard() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`https://dummyjson.com/users/${id}`);
      const data: User = await response.json();

      setUser(data);
    };

    getUser();
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <p>{user.email}</p>
    </div>
  );
}

export default UserCard;
