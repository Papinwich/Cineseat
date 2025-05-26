import React, { useEffect, useState } from 'react';
import useStore from '@/store/Store';
import { getUsers } from '@/api/User';

const TableUser = () => {
  const { token } = useStore();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const res = await getUsers(token);
    setUsers(res.data.data);
  };
  // console.log(users);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">User List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 truncate">
              <th className="border border-gray-300 px-4 py-2 w-16">ID</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100 truncate">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableUser;
