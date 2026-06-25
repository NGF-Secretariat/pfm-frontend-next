"use client";

import { useState, useEffect } from "react";
import { Lock, User, Plus, Trash2, ShieldCheck, Mail, Key, Eye, EyeOff, Map, Globe, BarChart2, Activity } from "lucide-react";
import { toast } from "react-toastify";
import { login } from "../../service/authService";
import { fetchUsers, createUser, updateUser, deleteUser } from "../../service/userService";
import budgetService from "../../service/budgetService";

export default function SettingsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  // Login Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // User Management State
  const [users, setUsers] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(false);

  // User Form State (Used for both Add and Edit)
  const [formData, setFormData] = useState({ name: "", email: "", role: "Viewer", password: "" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showUserPassword, setShowUserPassword] = useState(false);

  // State Profile Editor State
  const [selectedStateSlug, setSelectedStateSlug] = useState("");
  const [statesList, setStatesList] = useState<any[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    about: "",
    population: "",
    area: "",
    coordinates: "",
  });

  // Traffic Analytics State
  const [trafficStats, setTrafficStats] = useState<any>(null);
  const [loadingTraffic, setLoadingTraffic] = useState(false);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadSubscribers = async () => {
    setLoadingSubscribers(true);
    try {
      const res = await budgetService.getSubscribers();
      if (res?.data?.success) {
        setSubscribers(res.data.data);
      }
    } catch (e) {
      console.error("Failed to load subscribers:", e);
    } finally {
      setLoadingSubscribers(false);
    }
  };

  const loadStatesList = async () => {
    setLoadingStates(true);
    try {
      const res = await budgetService.getAllStateProfiles();
      if (res?.data?.success) {
        setStatesList(res.data.data);
      }
    } catch (e) {
      console.error("Failed to load states list:", e);
    } finally {
      setLoadingStates(false);
    }
  };

  const loadTrafficStats = async () => {
    setLoadingTraffic(true);
    try {
      const res = await budgetService.getTrafficStats();
      if (res?.data?.success) {
        setTrafficStats(res.data.data);
      }
    } catch (e) {
      toast.error("Failed to load traffic stats.");
      console.error(e);
    } finally {
      setLoadingTraffic(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
      loadUsers();
      loadSubscribers();
      loadStatesList();
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && activeTab === "state-data" && statesList.length === 0) {
      loadStatesList();
    }
  }, [activeTab, isLoggedIn, statesList.length]);

  useEffect(() => {
    if (isLoggedIn && activeTab === "traffic") {
      loadTrafficStats();
    }
  }, [activeTab, isLoggedIn]);

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
        loadSubscribers();
        loadStatesList();
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
    setSubscribers([]);
    setStatesList([]);
    setTrafficStats(null);
    setSelectedStateSlug("");
    setProfileForm({ about: "", population: "", area: "", coordinates: "" });
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

  const handleStateChange = async (slug: string) => {
    setSelectedStateSlug(slug);
    if (!slug) {
      setProfileForm({ about: "", population: "", area: "", coordinates: "" });
      return;
    }

    setFetchingProfile(true);
    try {
      const res = await budgetService.getStateProfileBySlug(slug);
      if (res?.data?.success) {
        const profile = res.data.data;
        setProfileForm({
          about: profile?.about || "",
          population: profile?.population !== null ? String(profile.population) : "",
          area: profile?.area || "",
          coordinates: profile?.coordinates || "",
        });
      }
    } catch (e) {
      toast.error("Failed to load state profile.");
      console.error(e);
    } finally {
      setFetchingProfile(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStateSlug) {
      toast.error("Please select a state first.");
      return;
    }

    setSavingProfile(true);
    try {
      const res = await budgetService.updateStateProfile(selectedStateSlug, {
        about: profileForm.about,
        population: profileForm.population ? parseFloat(profileForm.population) : null,
        area: profileForm.area || null,
        coordinates: profileForm.coordinates || null,
      });

      if (res?.data?.success) {
        toast.success("State profile updated successfully!");
        loadStatesList();
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "An error occurred while saving.");
      console.error(err);
    } finally {
      setSavingProfile(false);
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
                  type={showLoginPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="pl-10 pr-10 w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630] focus:ring-1 focus:ring-[#016630]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                >
                  {showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
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
    <div className="animate-fade-in max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-[#012c14] mb-2">Settings</h1>
          <p className="text-gray-500">Manage platform access, users, subscriber lists, and state profile details.</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-[#016630] font-semibold hover:text-[#014c24] transition-colors px-4 py-2 border border-[#016630] rounded-full hover:bg-green-50"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Menu */}
        <div className="lg:col-span-1 space-y-2">
          {/* Vertical Menu for desktop */}
          <div className="hidden lg:flex flex-col bg-white rounded-3xl p-4 shadow-sm border border-gray-100 space-y-1">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-left font-medium transition-all ${
                activeTab === "users"
                  ? "bg-green-50 text-[#016630] shadow-sm border-l-4 border-[#016630]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#016630]"
              }`}
            >
              <User size={18} />
              <span>User Management</span>
            </button>
            <button
              onClick={() => setActiveTab("subscribers")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-left font-medium transition-all ${
                activeTab === "subscribers"
                  ? "bg-green-50 text-[#016630] shadow-sm border-l-4 border-[#016630]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#016630]"
              }`}
            >
              <Mail size={18} />
              <span>Newsletter Subscribers</span>
            </button>
            <button
              onClick={() => setActiveTab("state-data")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-left font-medium transition-all ${
                activeTab === "state-data"
                  ? "bg-green-50 text-[#016630] shadow-sm border-l-4 border-[#016630]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#016630]"
              }`}
            >
              <Map size={18} />
              <span>Edit State Data</span>
            </button>
            <button
              onClick={() => setActiveTab("traffic")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-left font-medium transition-all ${
                activeTab === "traffic"
                  ? "bg-green-50 text-[#016630] shadow-sm border-l-4 border-[#016630]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#016630]"
              }`}
            >
              <BarChart2 size={18} />
              <span>Traffic Analytics</span>
            </button>
          </div>

          {/* Horizontal scroll tabs for mobile */}
          <div className="flex lg:hidden bg-white p-2 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto gap-2">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === "users"
                  ? "bg-green-50 text-[#016630]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <User size={16} />
              Users
            </button>
            <button
              onClick={() => setActiveTab("subscribers")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === "subscribers"
                  ? "bg-green-50 text-[#016630]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Mail size={16} />
              Subscribers
            </button>
            <button
              onClick={() => setActiveTab("state-data")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === "state-data"
                  ? "bg-green-50 text-[#016630]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Map size={16} />
              State Data
            </button>
            <button
              onClick={() => setActiveTab("traffic")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === "traffic"
                  ? "bg-green-50 text-[#016630]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <BarChart2 size={16} />
              Traffic
            </button>
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="lg:col-span-3">
          {activeTab === "users" && (
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
                          type={showUserPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="pl-9 pr-10 w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#016630]"
                          placeholder={editingId ? "Enter new password" : "Temporary password"}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={() => setShowUserPassword(!showUserPassword)}
                        >
                          {showUserPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
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
          )}

          {activeTab === "subscribers" && (
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden mb-8">
              <div className="p-6 sm:p-8 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-50 text-[#016630] rounded-full">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#012c14]">Newsletter Subscribers</h2>
                    <p className="text-gray-500 text-sm">View and manage newsletter subscription list.</p>
                  </div>
                </div>
              </div>

              {/* Subscribers Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="py-4 px-6 font-semibold text-sm text-gray-600">Email Address</th>
                      <th className="py-4 px-6 font-semibold text-sm text-gray-600">Subscribed Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-900">{sub.email}</td>
                        <td className="py-4 px-6 text-gray-500">
                          {new Date(sub.createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                    {subscribers.length === 0 && (
                      <tr>
                        <td colSpan={2} className="py-8 text-center text-gray-500">
                          {loadingSubscribers ? "Loading subscribers..." : "No subscribers found."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "state-data" && (
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden mb-8">
              <div className="p-6 sm:p-8 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-50 text-[#016630] rounded-full">
                    <Map size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#012c14]">Edit State Data</h2>
                    <p className="text-gray-500 text-sm">Update state metadata and description details.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="max-w-md">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select State</label>
                  {loadingStates ? (
                    <div className="text-sm text-gray-500 flex items-center gap-2 py-2">
                      <div className="w-4 h-4 border-2 border-[#016630] border-t-transparent rounded-full animate-spin"></div>
                      Loading states list...
                    </div>
                  ) : (
                    <select
                      value={selectedStateSlug}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630] focus:ring-1 focus:ring-[#016630] bg-white font-medium text-gray-800 shadow-sm"
                    >
                      <option value="">-- Choose a State --</option>
                      {statesList.map((state: any) => (
                        <option key={state.id} value={state.name.toLowerCase().replace(/\s+/g, "-")}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {fetchingProfile && (
                  <div className="mt-8 py-12 flex flex-col items-center justify-center text-gray-500 gap-3">
                    <div className="w-8 h-8 border-4 border-[#016630] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium">Fetching state profile data...</p>
                  </div>
                )}

                {!fetchingProfile && selectedStateSlug && (
                  <form onSubmit={handleSaveProfile} className="mt-8 space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Population</label>
                        <input
                          type="number"
                          step="any"
                          value={profileForm.population}
                          onChange={(e) => setProfileForm({ ...profileForm, population: e.target.value })}
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630] text-gray-800 font-medium"
                          placeholder="e.g. 3000000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq km)</label>
                        <input
                          type="text"
                          value={profileForm.area}
                          onChange={(e) => setProfileForm({ ...profileForm, area: e.target.value })}
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630] text-gray-800 font-medium"
                          placeholder="e.g. 6,320 sq km"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Coordinates</label>
                        <input
                          type="text"
                          value={profileForm.coordinates}
                          onChange={(e) => setProfileForm({ ...profileForm, coordinates: e.target.value })}
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630] text-gray-800 font-medium"
                          placeholder="e.g. 5.4542° N, 7.5244° E"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">About / State Description</label>
                      <textarea
                        rows={8}
                        value={profileForm.about}
                        onChange={(e) => setProfileForm({ ...profileForm, about: e.target.value })}
                        className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#016630] font-sans text-gray-800 leading-relaxed shadow-sm"
                        placeholder="Describe the state's budget indicators, demographic summaries, achievements, or general information..."
                      />
                      <p className="mt-1 text-xs text-gray-400">Supports plain text and markdown paragraphs.</p>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={savingProfile}
                        className="flex items-center gap-2 px-6 py-3 bg-[#016630] text-white rounded-full font-semibold hover:bg-[#014c24] transition-colors disabled:opacity-50"
                      >
                        {savingProfile && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                        {savingProfile ? "Saving Changes..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                )}

                {!fetchingProfile && !selectedStateSlug && (
                  <div className="mt-8 py-12 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-400">
                    <Globe className="w-12 h-12 mb-3 text-gray-300" />
                    <p className="text-sm font-medium">Please select a state to view and edit its profile details.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "traffic" && (
            <div className="space-y-8">
              {/* Traffic Summary Overview */}
              <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-50 text-[#016630] rounded-full">
                      <Activity size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#012c14]">Traffic Analytics</h2>
                      <p className="text-gray-500 text-sm">Monitor platform views and unique visitors in real-time.</p>
                    </div>
                  </div>
                  <button
                    onClick={loadTrafficStats}
                    disabled={loadingTraffic}
                    className="text-xs font-semibold px-3 py-1.5 border border-[#016630] rounded-full text-[#016630] hover:bg-green-50 transition-colors disabled:opacity-50"
                  >
                    {loadingTraffic ? "Refreshing..." : "Refresh"}
                  </button>
                </div>

                {loadingTraffic && !trafficStats ? (
                  <div className="p-12 flex flex-col items-center justify-center text-gray-500 gap-3">
                    <div className="w-8 h-8 border-4 border-[#016630] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium">Loading analytics dashboard...</p>
                  </div>
                ) : (
                  <div className="p-6 sm:p-8 animate-fade-in">
                    {/* KPI Cards Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Views</p>
                        <p className="text-2xl font-bold text-gray-800">{trafficStats?.totalPageViews ?? 0}</p>
                        <p className="text-[10px] text-gray-500 mt-1">Last 30 Days</p>
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Visitors</p>
                        <p className="text-2xl font-bold text-gray-800">{trafficStats?.totalUniqueVisitors ?? 0}</p>
                        <p className="text-[10px] text-gray-500 mt-1">Unique Over Lifetime</p>
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Today's Views</p>
                        <p className="text-2xl font-bold text-green-700">{trafficStats?.todayPageViews ?? 0}</p>
                        <p className="text-[10px] text-gray-500 mt-1">Current Day Hits</p>
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Today's Visitors</p>
                        <p className="text-2xl font-bold text-green-700">{trafficStats?.todayUniqueVisitors ?? 0}</p>
                        <p className="text-[10px] text-gray-500 mt-1">Current Day Unique</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="md:col-span-2">
                        <DailyTrafficChart trafficPerDay={trafficStats?.trafficPerDay ?? []} />
                      </div>
                      <div className="md:col-span-1">
                        <SectionsVisitedList sections={trafficStats?.sectionsVisited ?? []} />
                      </div>
                    </div>

                    <div className="mt-8">
                      <PagesVisitedTable pages={trafficStats?.pagesVisited ?? []} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface DailyTrafficChartProps {
  trafficPerDay: Array<{ date: string; views: number; visitors: number }>;
}

function DailyTrafficChart({ trafficPerDay }: DailyTrafficChartProps) {
  if (!trafficPerDay || trafficPerDay.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400 border border-gray-100 rounded-3xl bg-gray-50/50">
        No traffic logs available for this period.
      </div>
    );
  }

  const displayData = trafficPerDay.slice(-15);
  const maxVal = Math.max(...displayData.map((d) => d.views), 1);
  const width = 600;
  const height = 240;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = (chartWidth / displayData.length) - 6;

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-[#012c14] mb-4">Traffic over the Last 15 Days</h3>
      <div className="w-full">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
            const y = padding + chartHeight * (1 - ratio);
            const val = Math.round(maxVal * ratio);
            return (
              <g key={index} className="opacity-40">
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" />
                <text x={padding - 10} y={y + 4} textAnchor="end" className="text-[10px] fill-gray-400 font-semibold">{val}</text>
              </g>
            );
          })}

          {displayData.map((d, index) => {
            const x = padding + index * (chartWidth / displayData.length) + 3;
            const barHeight = (d.views / maxVal) * chartHeight;
            const y = height - padding - barHeight;

            const visitorHeight = (d.visitors / maxVal) * chartHeight;
            const visitorY = height - padding - visitorHeight;

            const dateObj = new Date(d.date);
            const dayStr = String(dateObj.getDate()).padStart(2, '0') + '/' + String(dateObj.getMonth() + 1).padStart(2, '0');

            return (
              <g key={index} className="group">
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={Math.max(barHeight, 2)}
                  fill="#016630"
                  rx="3"
                  className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                />

                <rect
                  x={x + barWidth / 4}
                  y={visitorY}
                  width={barWidth / 2}
                  height={Math.max(visitorHeight, 2)}
                  fill="#5DCAA5"
                  rx="1.5"
                  className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                />

                <text
                  x={x + barWidth / 2}
                  y={height - padding + 18}
                  textAnchor="middle"
                  className="text-[9px] fill-gray-400 font-semibold"
                >
                  {dayStr}
                </text>
                <title>{`Date: ${d.date}\nViews: ${d.views}\nUnique Visitors: ${d.visitors}`}</title>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex gap-4 justify-center mt-4 text-xs font-semibold">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-[#016630] rounded-sm"></div>
          <span className="text-gray-500">Page Views</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-[#5DCAA5] rounded-sm"></div>
          <span className="text-gray-500">Unique Visitors</span>
        </div>
      </div>
    </div>
  );
}

interface SectionsVisitedListProps {
  sections: Array<{ section: string; count: number }>;
}

function SectionsVisitedList({ sections }: { sections: Array<{ section: string; count: number }> }) {
  if (!sections || sections.length === 0) {
    return (
      <div className="h-full min-h-[250px] flex items-center justify-center text-gray-400 border border-gray-100 rounded-3xl bg-gray-50/50">
        No stats.
      </div>
    );
  }

  const total = sections.reduce((acc, s) => acc + s.count, 0);

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-full flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-[#012c14] mb-6 font-sans">Traffic by Portal Section</h3>
        <div className="space-y-4">
          {sections.slice(0, 6).map((sec, idx) => {
            const percentage = Math.round((sec.count / total) * 100);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-gray-700">{sec.section}</span>
                  <span className="text-gray-500">{sec.count} ({percentage}%)</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#016630] h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface PagesVisitedTableProps {
  pages: Array<{ page: string; count: number }>;
}

function PagesVisitedTable({ pages }: PagesVisitedTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (!pages || pages.length === 0) return null;

  const totalPages = Math.ceil(pages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPages = pages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-sm font-bold text-[#012c14]">Most Visited Pages</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="py-3 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Page Route Path</th>
              <th className="py-3 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider text-right">Hit Count</th>
            </tr>
          </thead>
          <tbody>
            {displayedPages.map((p, idx) => (
              <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-3.5 px-6 font-mono text-[11px] text-gray-600 truncate max-w-md">{p.page}</td>
                <td className="py-3.5 px-6 font-bold text-sm text-right text-gray-800">{p.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs font-semibold text-gray-500">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
