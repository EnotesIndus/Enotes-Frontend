import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, RefreshCw } from 'lucide-react';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterActive, setFilterActive] = useState('all');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const [formData, setFormData] = useState({
    name: '',
    isActive: true
  });

  useEffect(() => {
    fetchCategories();
  }, [filterActive]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData = [
        { id: 1, name: 'Technology', isActive: true, createdBy: 1, createdOn: new Date('2024-01-15'), updatedBy: 1, updatedOn: new Date('2024-01-20') },
        { id: 2, name: 'Science', isActive: true, createdBy: 1, createdOn: new Date('2024-01-16'), updatedBy: null, updatedOn: null },
        { id: 3, name: 'Arts', isActive: false, createdBy: 2, createdOn: new Date('2024-01-17'), updatedBy: 2, updatedOn: new Date('2024-01-25') },
        { id: 4, name: 'Business', isActive: true, createdBy: 1, createdOn: new Date('2024-01-18'), updatedBy: null, updatedOn: null },
        { id: 5, name: 'Health', isActive: false, createdBy: 3, createdOn: new Date('2024-01-19'), updatedBy: 3, updatedOn: new Date('2024-01-22') },
      ];
      
      let filtered = mockData;
      if (filterActive === 'active') {
        filtered = mockData.filter(cat => cat.isActive);
      } else if (filterActive === 'inactive') {
        filtered = mockData.filter(cat => !cat.isActive);
      }
      
      setCategories(filtered);
    } catch (error) {
      showNotification('Failed to fetch categories', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleAddCategory = async () => {
    if (!formData.name.trim()) {
      showNotification('Please enter a category name', 'error');
      return;
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      showNotification('Category saved successfully', 'success');
      setShowAddModal(false);
      setFormData({ name: '', isActive: true });
      fetchCategories();
    } catch (error) {
      showNotification('Failed to save category', 'error');
    }
  };

  const handleEditCategory = async () => {
    if (!formData.name.trim()) {
      showNotification('Please enter a category name', 'error');
      return;
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      showNotification('Category updated successfully', 'success');
      setShowEditModal(false);
      setFormData({ name: '', isActive: true });
      setSelectedCategory(null);
      fetchCategories();
    } catch (error) {
      showNotification('Failed to update category', 'error');
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      showNotification(`Deleted category with id=${selectedCategory.id}`, 'success');
      setShowDeleteModal(false);
      setSelectedCategory(null);
      fetchCategories();
    } catch (error) {
      showNotification('Cannot delete category', 'error');
    }
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      isActive: category.isActive
    });
    setShowEditModal(true);
  };

  const openViewModal = (category) => {
    setSelectedCategory(category);
    setShowViewModal(true);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
              <p className="text-gray-600 mt-1">Manage your categories efficiently</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Category
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilterActive('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterActive === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setFilterActive('active')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterActive === 'active' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active Only
            </button>
            <button
              onClick={() => setFilterActive('inactive')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterActive === 'inactive' 
                  ? 'bg-gray-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inactive Only
            </button>
            <button
              onClick={fetchCategories}
              className="ml-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No categories found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          category.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(category.createdOn)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openViewModal(category)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => openEditModal(category)}
                            className="text-green-600 hover:text-green-800 transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(category)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Add New Category</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter category name"
                />
              </div>
              <div className="mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">Active</span>
                </label>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({ name: '', isActive: true });
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="bg-green-600 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Edit Category</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Category ID</label>
                <input
                  type="text"
                  value={selectedCategory.id}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter category name"
                />
              </div>
              <div className="mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700 font-medium">Active</span>
                </label>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCategory(null);
                    setFormData({ name: '', isActive: true });
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditCategory}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Update Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Category Modal */}
      {showViewModal && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="bg-indigo-600 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Category Details</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium text-gray-700">ID:</span>
                  <span className="text-gray-900">{selectedCategory.id}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="text-gray-900">{selectedCategory.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedCategory.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedCategory.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium text-gray-700">Created By:</span>
                  <span className="text-gray-900">{selectedCategory.createdBy}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium text-gray-700">Created On:</span>
                  <span className="text-gray-900">{formatDate(selectedCategory.createdOn)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium text-gray-700">Updated By:</span>
                  <span className="text-gray-900">{selectedCategory.updatedBy || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium text-gray-700">Updated On:</span>
                  <span className="text-gray-900">{formatDate(selectedCategory.updatedOn)}</span>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedCategory(null);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="bg-red-600 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Delete Category</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-red-100 p-3 rounded-full">
                  <Trash2 size={24} className="text-red-600" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">Are you sure you want to delete this category?</p>
                  <p className="text-gray-600 text-sm mt-1">
                    Category: <span className="font-semibold">{selectedCategory.name}</span>
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                This action cannot be undone. This will permanently delete the category.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedCategory(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCategory}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;