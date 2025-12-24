import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, Circle, Clock, AlertCircle, Trash2, Edit2, X, Check } from 'lucide-react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM',
    status: 'PENDING'
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockTodos = [
      {
        id: 1,
        title: 'Complete project documentation',
        description: 'Write comprehensive documentation for the new feature',
        dueDate: '2024-12-25',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        createdAt: '2024-12-20'
      },
      {
        id: 2,
        title: 'Review pull requests',
        description: 'Review and merge pending pull requests',
        dueDate: '2024-12-24',
        priority: 'MEDIUM',
        status: 'PENDING',
        createdAt: '2024-12-21'
      },
      {
        id: 3,
        title: 'Fix bug in login module',
        description: 'Users reporting issues with login functionality',
        dueDate: '2024-12-23',
        priority: 'HIGH',
        status: 'COMPLETED',
        createdAt: '2024-12-19'
      },
      {
        id: 4,
        title: 'Update dependencies',
        description: 'Update all npm packages to latest versions',
        dueDate: '2024-12-30',
        priority: 'LOW',
        status: 'PENDING',
        createdAt: '2024-12-22'
      }
    ];
    setTodos(mockTodos);
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'all') return true;
    return todo.status === currentFilter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'IN_PROGRESS':
        return <Clock className="text-blue-500" size={20} />;
      case 'PENDING':
        return <Circle className="text-gray-400" size={20} />;
      default:
        return <Circle className="text-gray-400" size={20} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PENDING':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCreateTodo = () => {
    if (newTodo.title.trim() === '') return;

    const todo = {
      id: Date.now(),
      ...newTodo,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTodos([todo, ...todos]);
    setNewTodo({
      title: '',
      description: '',
      dueDate: '',
      priority: 'MEDIUM',
      status: 'PENDING'
    });
    setShowCreateModal(false);
  };

  const handleUpdateTodo = () => {
    setTodos(todos.map(todo =>
      todo.id === editingTodo.id ? editingTodo : todo
    ));
    setEditingTodo(null);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    ));
  };

  const getStatusCount = (status) => {
    return todos.filter(todo => todo.status === status).length;
  };

  return (
    <div className="min-h-screen  from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus size={18} />
              New Task
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Filter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setCurrentFilter('all')}
            className={`p-4 rounded-lg border-2 transition-all ${
              currentFilter === 'all'
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">All Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{todos.length}</p>
              </div>
              <AlertCircle className="text-purple-600" size={32} />
            </div>
          </button>

          <button
            onClick={() => setCurrentFilter('PENDING')}
            className={`p-4 rounded-lg border-2 transition-all ${
              currentFilter === 'PENDING'
                ? 'border-gray-600 bg-gray-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{getStatusCount('PENDING')}</p>
              </div>
              <Circle className="text-gray-400" size={32} />
            </div>
          </button>

          <button
            onClick={() => setCurrentFilter('IN_PROGRESS')}
            className={`p-4 rounded-lg border-2 transition-all ${
              currentFilter === 'IN_PROGRESS'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{getStatusCount('IN_PROGRESS')}</p>
              </div>
              <Clock className="text-blue-500" size={32} />
            </div>
          </button>

          <button
            onClick={() => setCurrentFilter('COMPLETED')}
            className={`p-4 rounded-lg border-2 transition-all ${
              currentFilter === 'COMPLETED'
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{getStatusCount('COMPLETED')}</p>
              </div>
              <CheckCircle className="text-green-500" size={32} />
            </div>
          </button>
        </div>

        {/* Todo List */}
        {filteredTodos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <AlertCircle size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">No tasks found</p>
            <p className="text-gray-500 mt-2">Create your first task to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTodos.map(todo => (
              <div
                key={todo.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200"
              >
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div className="mt-1">
                    {getStatusIcon(todo.status)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{todo.title}</h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingTodo(todo)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-3">{todo.description}</p>

                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Priority Badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(todo.priority)}`}>
                        {todo.priority}
                      </span>

                      {/* Status Badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(todo.status)}`}>
                        {todo.status.replace('_', ' ')}
                      </span>

                      {/* Due Date */}
                      {todo.dueDate && (
                        <span className="text-sm text-gray-500">
                          Due: {new Date(todo.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {/* Status Actions */}
                    <div className="flex gap-2 mt-4">
                      {todo.status !== 'PENDING' && (
                        <button
                          onClick={() => updateStatus(todo.id, 'PENDING')}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                        >
                          Mark Pending
                        </button>
                      )}
                      {todo.status !== 'IN_PROGRESS' && (
                        <button
                          onClick={() => updateStatus(todo.id, 'IN_PROGRESS')}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        >
                          Start Progress
                        </button>
                      )}
                      {todo.status !== 'COMPLETED' && (
                        <button
                          onClick={() => updateStatus(todo.id, 'COMPLETED')}
                          className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingTodo) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingTodo ? 'Edit Task' : 'Create New Task'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingTodo(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingTodo ? editingTodo.title : newTodo.title}
                  onChange={(e) =>
                    editingTodo
                      ? setEditingTodo({ ...editingTodo, title: e.target.value })
                      : setNewTodo({ ...newTodo, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter task title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingTodo ? editingTodo.description : newTodo.description}
                  onChange={(e) =>
                    editingTodo
                      ? setEditingTodo({ ...editingTodo, description: e.target.value })
                      : setNewTodo({ ...newTodo, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter task description..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={editingTodo ? editingTodo.priority : newTodo.priority}
                    onChange={(e) =>
                      editingTodo
                        ? setEditingTodo({ ...editingTodo, priority: e.target.value })
                        : setNewTodo({ ...newTodo, priority: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editingTodo ? editingTodo.status : newTodo.status}
                    onChange={(e) =>
                      editingTodo
                        ? setEditingTodo({ ...editingTodo, status: e.target.value })
                        : setNewTodo({ ...newTodo, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={editingTodo ? editingTodo.dueDate : newTodo.dueDate}
                    onChange={(e) =>
                      editingTodo
                        ? setEditingTodo({ ...editingTodo, dueDate: e.target.value })
                        : setNewTodo({ ...newTodo, dueDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={editingTodo ? handleUpdateTodo : handleCreateTodo}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  {editingTodo ? 'Update Task' : 'Create Task'}
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingTodo(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;