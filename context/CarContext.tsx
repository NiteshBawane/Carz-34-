import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Car } from '../types';
import { MOCK_CARS } from '../constants';
import { db, isFirebaseConfigured } from '../services/firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query,
  orderBy
} from 'firebase/firestore';

interface CarContextType {
  cars: Car[];
  loading: boolean;
  isCloudSync: boolean;
  addCar: (car: Omit<Car, 'id'>) => Promise<void>;
  updateCar: (id: string, car: Partial<Car>) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCloudSync, setIsCloudSync] = useState(false);

  useEffect(() => {
    // If Firebase is configured, set up a real-time listener
    if (isFirebaseConfigured && db) {
      setIsCloudSync(true);
      const q = query(collection(db, "inventory"), orderBy("year", "desc"));
      
      // onSnapshot is the key for real-time cross-device updates
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const carsData: Car[] = [];
        querySnapshot.forEach((doc) => {
          carsData.push({ id: doc.id, ...doc.data() } as Car);
        });
        
        // Seed database if it's completely empty (one-time setup)
        if (carsData.length === 0 && loading) {
          console.log("Database empty. Seeding with initial data...");
          MOCK_CARS.forEach(async (car) => {
            const { id, ...data } = car;
            await addDoc(collection(db, "inventory"), data);
          });
        } else {
          setCars(carsData);
        }
        setLoading(false);
      }, (error) => {
        console.error("Firestore real-time sync error:", error);
        setIsCloudSync(false);
        loadLocalFallback();
      });

      return () => unsubscribe();
    } else {
      loadLocalFallback();
    }
  }, []);

  const loadLocalFallback = () => {
    const saved = localStorage.getItem('carz34_inventory');
    if (saved) {
      setCars(JSON.parse(saved));
    } else {
      setCars(MOCK_CARS);
    }
    setLoading(false);
  };

  // Sync to local storage for offline use if cloud is not available
  useEffect(() => {
    if (!isCloudSync && !loading) {
      localStorage.setItem('carz34_inventory', JSON.stringify(cars));
    }
  }, [cars, isCloudSync, loading]);

  const addCar = useCallback(async (newCar: Omit<Car, 'id'>) => {
    if (isCloudSync && db) {
      await addDoc(collection(db, "inventory"), newCar);
    } else {
      const carWithId: Car = {
        ...newCar,
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      };
      setCars(prev => [carWithId, ...prev]);
    }
  }, [isCloudSync]);

  const updateCar = useCallback(async (id: string, updatedFields: Partial<Car>) => {
    if (isCloudSync && db) {
      const carRef = doc(db, "inventory", id);
      await updateDoc(carRef, updatedFields);
    } else {
      setCars(prev => prev.map(car => car.id === id ? { ...car, ...updatedFields } : car));
    }
  }, [isCloudSync]);

  const deleteCar = useCallback(async (id: string) => {
    if (isCloudSync && db) {
      const carRef = doc(db, "inventory", id);
      await deleteDoc(carRef);
    } else {
      setCars(prev => prev.filter(car => car.id !== id));
    }
  }, [isCloudSync]);

  return (
    <CarContext.Provider value={{ cars, loading, isCloudSync, addCar, updateCar, deleteCar }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarContext);
  if (!context) throw new Error('useCars must be used within CarProvider');
  return context;
};