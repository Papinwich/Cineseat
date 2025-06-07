import React, { useEffect, useState } from 'react';
import useStore from '@/store/Store';
import { getUsers } from '@/api/User';
import TablePagination from '@/components/ui/TablePagination';

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
  //----- Pagination -----//
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentData = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  //---------------------//
  // console.log(currentData);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">User List</h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b border-gray-300 text-xs  text-gray-600 truncate">
            <tr>
              <th className="py-4 px-2 text-center w-16">ID</th>
              <th className="py-4 px-2 min-w-36">Username</th>
              <th className="py-4 px-2 min-w-36">Email</th>
              <th className="py-4 px-2 w-20">Role</th>
              <th className="py-4 px-2 w-20">Bookings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 truncate">
                <td className="p-2 text-center">{item.id}</td>
                <td className="p-2">{item.username}</td>
                <td className="p-2">{item.email}</td>
                <td className="p-2">{item.role}</td>
                <td className="p-2">{item.bookings.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TableUser;
