import { useDispatch as useReduxDispatch } from 'react-redux';
import { AppDispatch } from './store'; // Ajusta la ruta según la ubicación de tu archivo store

export const useDispatch = () => useReduxDispatch<AppDispatch>();
