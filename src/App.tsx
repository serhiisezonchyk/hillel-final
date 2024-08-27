import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import AppRouter from './components/AppRouter';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import { DEFAULT_CITY, STORAGE_KEYS } from './consts';
import { QuickOrderContextProvider } from './context/QuickOrderContext';
import { StorageService } from './lib/StorageService';
import { checkAuth } from './store/slices/auth';
import { CitiesNP } from './types';
function App() {
  const dispatch = useDispatch();
  const cityStorage = useMemo(() => new StorageService<CitiesNP>(STORAGE_KEYS.city.type, STORAGE_KEYS.city.key), []);
  useEffect(() => {
    if (!cityStorage.getItems()) cityStorage.setItems(DEFAULT_CITY);
  }, [cityStorage]);
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QuickOrderContextProvider>
        <AppRouter />
        <Toaster closeButton />
      </QuickOrderContextProvider>
    </ThemeProvider>
  );
}

export default App;
