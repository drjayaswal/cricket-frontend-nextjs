'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Search } from "lucide-react";
import { useUserStore } from "@/lib/store";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

interface User {
  _id: string;
  name: string;
  email?: string;
  mobile?: string;
  amount: number;
  portfolio: any[]; // You might want to define a more specific type for portfolio items
}

interface UserResponse {
  users: User[];
  currentPage: number;
  totalPages: number;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const router = useRouter();

  const fetchUsers = async (page: number = 1, search: string = ""): Promise<void> => {
    setLoading(true);
    try {
      let url = `${BACKEND_URL}/admin/fetch-users?page=${page}&limit=10`;
      if (search) {
        url = `${BACKEND_URL}/admin/fetch-users?query=${search}`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: UserResponse = await res.json();
      setUsers(data.users);
      if (!search) {
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetchUsers(1, searchQuery);
  };

  const handleViewDetails = (userId: string): void => {
    router.push(`/admin/manage-users/user-details?id=${userId}`);
  };

  return (
    <section className="bg-[#181a20] flex flex-col gap-5 rounded-2xl p-4 sm:p-8 w-full max-w-full">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors cursor-pointer"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="w-full h-full text-xl flex gap-3 justify-center items-center">
          Loading <LoaderCircle className="animate-spin" />
        </div>
      ) : (
        <>
          {users.length === 0 ? (
            <div className="text-center py-8 text-gray-300 text-lg">
              No users found
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full rounded-lg overflow-hidden">
                  <thead className="bg-gray-100/10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Portfolio</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/10">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50/5">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {user.email || user.mobile || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {user.portfolio.length > 0 ? user.portfolio.length : 'Empty'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <button
                            onClick={() => handleViewDetails(user._id)}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
