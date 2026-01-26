
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Car } from '../types';
import { MOCK_CARS } from '../constants';

interface CarContextType {
  cars: Car[];
  addCar: (car: Omit<Car, 'id'>) => void;
  updateCar: (id: string, car: Partial<Car>) => void;
  deleteCar: (id: string) => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>(() => {
    try {
      const saved = localStorage.getItem('carz34_inventory');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Fix: Don't revert to MOCK_CARS if parsed is an empty array []
        return Array.isArray(parsed) ? parsed : MOCK_CARS;
      }
      return MOCK_CARS;
    } catch (e) {
      console.error("Failed to load inventory from storage:", e);
      return MOCK_CARS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('carz34_inventory', JSON.stringify(cars));
    } catch (e) {
      console.error("Failed to save inventory to storage:", e);
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert("Storage limit reached! Please use smaller images or remove some vehicles.");
      }
    }
  }, [cars]);

  const addCar = useCallback((newCar: Omit<Car, 'id'>) => {
    const carWithId: Car = {
      ...newCar,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    };
    setCars(prev => [carWithId, ...prev]);
  }, []);

  const updateCar = useCallback((id: string, updatedFields: Partial<Car>) => {
    setCars(prev => prev.map(car => car.id === id ? { ...car, ...updatedFields } : car));
  }, []);

  const deleteCar = useCallback((id: string) => {
    setCars(prev => prev.filter(car => car.id !== id));
  }, []);

  return (
    <CarContext.Provider value={{ cars, addCar, updateCar, deleteCar }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarContext);
  if (!context) throw new Error('useCars must be used within CarProvider');
  return context;
};
