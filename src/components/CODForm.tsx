import React, { useState } from 'react';
import { Phone, User, MapPin, Building2, MessageSquare } from 'lucide-react';

interface FormData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  productId: string;
  variantId: string;
}

interface CODFormProps {
  productId: string;
  variantId: string;
  onSubmit: (data: FormData) => void;
}

export default function CODForm({ productId, variantId, onSubmit }: CODFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
    productId,
    variantId,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
        Cash on Delivery Details
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <User className="w-4 h-4 mr-2" />
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Phone className="w-4 h-4 mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+1 (555) 000-0000"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <MapPin className="w-4 h-4 mr-2" />
            Delivery Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="123 Main St, Apt 4B"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Building2 className="w-4 h-4 mr-2" />
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="New York"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <MessageSquare className="w-4 h-4 mr-2" />
            Delivery Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Any special instructions for delivery..."
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}