import React, { useState } from 'react';
import CODForm from './components/CODForm';
import Modal from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Test handler for form submission
  const handleSubmit = (data: any) => {
    console.log('Form submitted with data:', data);
    alert('Order submitted successfully!');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Test button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Test COD Button
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CODForm 
          productId="test-product-123"
          variantId="test-variant-456"
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}

export default App;