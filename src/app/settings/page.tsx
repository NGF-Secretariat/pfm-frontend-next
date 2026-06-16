"use client";

import { useState, useEffect } from "react";
import { Lock, User, Plus, Trash2, ShieldCheck, Mail, Key } from "lucide-react";
import { toast } from "react-toastify";
import { login } from "../../service/authService";
import { fetchUsers, createUser, updateUser, deleteUser } from "../../service/userService";

export default function SettingsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // User Management State
  const [users, setUsers] = useState<any[]>([]);

  // Form State (Used for both Add and Edit)
  const [formData, setFormData] = useState({ name: "", email: "", role: "Viewer", password: "" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
      loadUsers();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      try {
        const data = await login(loginEmail, loginPassword);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", data.access_token);
        setIsLoggedIn(true);
        toast.success("Successfully logged in!");
        window.dispatchEvent(new Event("authStateChanged"));
        loadUsers();
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Invalid credentials.");
      }
    } else {
      toast.error("Please enter email and password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsers([]);
    setLoginEmail("");
    setLoginPassword("");
    window.dispatchEvent(new Event("authStateChanged"));
  };

  const handleOpenAdd = () => {
    setFormData({ name: "", email: "", role: "Viewer", password: "" });
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (user: any) => {
    setFormData({ name: user.name, email: user.email, role: user.role, password: "" });
    setEditingId(user.id);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Name and Email are required.");
      return;
    }

    try {
      if (editingId) {
        // Edit existing user
        await updateUser(editingId, formData);
        toast.success("User updated successfully!");
      } else {
        // Add new user
        if (!formData.password) {
          toast.error("Password is required for new users.");
          return;
        }
        await createUser(formData);
        toast.success("User added successfully!");
      }
      
      setIsFormOpen(false);
      setEditingId(null);
      loadUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      toast.info("User removed.");
      loadUsers();
    } catch (err: any) {
      toast.error("Failed to delete user.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center animate-fade-in py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-[#016630] py-8 px-6 text-center">
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Login</h2>
            <p className="text-green-100 mt-2 text-sm">Sign in to access platform settings</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630] focus:ring-1 focus:ring-[#016630]"
                  placeholder="admin@ngf.org.ng"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630] focus:ring-1 focus:ring-[#016630]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-[#016630] hover:bg-[#014c24] transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#012c14] mb-2">Settings</h1>
          <p className="text-gray-500">Manage platform access and user accounts.</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-[#016630] font-semibold hover:text-[#014c24] transition-colors px-4 py-2 border border-[#016630] rounded-full hover:bg-green-50"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 sm:p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 text-[#016630] rounded-full">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#012c14]">User Management</h2>
              <p className="text-gray-500 text-sm">Add or remove administrators and editors.</p>
            </div>
          </div>
          <button
            onClick={isFormOpen ? () => setIsFormOpen(false) : handleOpenAdd}
            className="flex items-center gap-2 bg-[#016630] text-white px-5 py-2.5 rounded-full font-medium hover:bg-[#014c24] transition-colors"
          >
            <Plus size={18} />
            {isFormOpen && !editingId ? "Cancel" : "Add New User"}
          </button>
        </div>

        {/* Add/Edit User Form Inline */}
        {isFormOpen && (
          <div className="p-6 sm:p-8 bg-gray-50 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-[#012c14] mb-4">
              {editingId ? "Edit Account" : "Create New Account"}
            </h3>
            <form onSubmit={handleSaveUser} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#016630]"
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#016630]"
                  placeholder="jane@ngf.org.ng"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#016630] bg-white"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editingId ? "New Password (leave blank to keep current)" : "Password"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-9 w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#016630]"
                    placeholder={editingId ? "Enter new password" : "Temporary password"}
                  />
                </div>
              </div>
              <div className="sm:col-span-2 flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#016630] text-white rounded-lg font-medium hover:bg-[#014c24] transition-colors"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 font-semibold text-sm text-gray-600">Name</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-600">Email</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-600">Role</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{user.name}</td>
                  <td className="py-4 px-6 text-gray-500">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' : 
                      user.role === 'Editor' ? 'bg-blue-100 text-blue-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(user)}
                      className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[#016630] hover:bg-green-50 transition-colors border border-transparent hover:border-green-100 font-medium text-sm gap-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Delete User"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
