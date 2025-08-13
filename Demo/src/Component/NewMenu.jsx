import React, { useState } from 'react';

const NewMenu = ({ onBack, onAddItem }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Breakfast',
    image: null,
    isAvailable: true
  });

  const categories = ['Breakfast', 'Launch', 'Fasting food'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.price) {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        category: formData.category,
        image: formData.image || '🍽️',
        isActive: formData.isAvailable
      };
      onAddItem(newItem);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Breakfast',
        image: null,
        isAvailable: true
      });
      setShowForm(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGallerySelect = () => {
    const sampleImages = ['🍽️', '🍗', '🫘', '🥘', '🥩', '🍖', '🥬', '🫓'];
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setFormData(prev => ({
      ...prev,
      image: randomImage
    }));
  };

  if (!showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-4xl font-bold text-yellow-400">New Menu</h1>
          </div>

          <div className="flex justify-center">
            <div 
              onClick={() => setShowForm(true)}
              className="w-80 h-96 bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 flex items-center justify-center border-2 border-dashed border-gray-600 hover:border-yellow-400"
            >
              <div className="text-center">
                <div className="text-8xl text-yellow-400 mb-4">+</div>
                <p className="text-white text-lg font-medium">Add New Item</p>
                <p className="text-gray-400 text-sm mt-2">Click to create a new menu item</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setShowForm(false)}
            className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Menu</span>
          </button>
          <h1 className="text-4xl font-bold text-yellow-400">Edit Menu Item</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Dish Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Name of the dish"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="price in birr"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Enter food description"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-white text-sm">Tap the switch to mark this dish as Available or Unavailable.</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) => setFormData(prev => ({ ...prev, isAvailable: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
            </label>
          </div>

          <div>
            <label className="block text-white font-medium mb-4">Food Image</label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-center">
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 cursor-pointer hover:border-yellow-400 transition-colors">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-2 text-sm text-white">upload image</p>
                    <p className="text-xs text-gray-400">Drag and drop image</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              
              <div className="text-white text-sm">or</div>
              
              <div className="flex-1">
                <button
                  type="button"
                  onClick={handleGallerySelect}
                  className="w-full h-full bg-amber-800 rounded-lg p-6 hover:bg-amber-700 transition-colors"
                >
                  <p className="text-white text-sm font-medium">Choose from Gallery</p>
                </button>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-yellow-400 text-gray-900 font-semibold py-3 px-6 rounded-md hover:bg-yellow-300 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <div className="w-4 h-4 bg-white rounded-full"></div>
              <span>Add</span>
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-500 transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMenu;
