import React, { useState, useEffect } from 'react';
import { schemeService } from '../../services/schemeService';
import { useNotification } from '../../context/NotificationContext';
import Loader from '../../components/Loader';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const ManageSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: '', description: '', category: '', eligibility: '', benefits: '', deadline: ''
  });

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const response = await schemeService.getAllSchemes();
      setSchemes(response.data.data || []);
    } catch (error) {
      addNotification('Failed to load schemes', 'error');
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingScheme) {
        await schemeService.updateScheme(editingScheme._id, formData);
        addNotification('Scheme updated successfully', 'success');
      } else {
        await schemeService.createScheme(formData);
        addNotification('Scheme created successfully', 'success');
      }
      setShowModal(false);
      setEditingScheme(null);
      fetchSchemes();
    } catch (error) {
      addNotification('Operation failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await schemeService.deleteScheme(id);
        addNotification('Scheme deleted', 'success');
        fetchSchemes();
      } catch (error) {
        addNotification('Delete failed', 'error');
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Schemes</h1>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center">
          <FiPlus className="mr-2" /> Add Scheme
        </button>
      </div>

      <div className="space-y-4">
        {schemes.map(scheme => (
          <div key={scheme._id} className="card flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{scheme.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{scheme.category}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingScheme(scheme); setFormData(scheme); setShowModal(true); }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                <FiEdit />
              </button>
              <button onClick={() => handleDelete(scheme._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded">
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{editingScheme ? 'Edit' : 'Add'} Scheme</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Name" required className="input-field"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <textarea placeholder="Description" required className="input-field" rows="3"
                value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              <input type="text" placeholder="Category" required className="input-field"
                value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
              <input type="date" required className="input-field"
                value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})} />
              <div className="flex gap-2">
                <button type="submit" className="btn-primary">Save</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSchemes;
