import React, { useState } from 'react';

const NewMenu = ({ onBack, onAddItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Breakfast',
    image: '🍽️'
  });

  const categories = ['Breakfast', 'Launch', 'Fasting food'];
  const foodEmojis = ['🍽️', '🍗', '🫘', '🥘', '🥩', '🍖', '🥬', '🫓', '🍕', '🍔', '🌮', '🍜', '🍚', '🥗', '🍣', '🍱'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.description && formData.price) {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        category: formData.category,
        image: formData.image,
        isActive: true
      };
      onAddItem(newItem);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Breakfast',
        image: '🍽️'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
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
          <h1 className="text-4xl font-bold text-yellow-400">New Menu Item</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 space-y-6">
          {/* Food Name */}
          <div>
            <label className="block text-white font-medium mb-2">Food Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Enter food name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Enter food description"
              required
            />
          </div>

          {/* Price and Category Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Price (Birr)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="0"
                min="0"
                required
              />
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

          {/* Food Icon */}
          <div>
            <label className="block text-white font-medium mb-2">Food Icon</label>
            <div className="grid grid-cols-8 gap-2">
              {foodEmojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: emoji }))}
                  className={`w-12 h-12 text-2xl rounded-lg border-2 transition-all ${
                    formData.image === emoji
                      ? 'border-yellow-400 bg-yellow-400 bg-opacity-20'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 px-6 rounded-md hover:bg-yellow-300 transition-colors duration-200"
          >
            Add Menu Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewMenu;
