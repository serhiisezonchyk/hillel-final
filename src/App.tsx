import { useEffect, useMemo } from 'react';
import AppRouter from './components/AppRouter';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import { DEFAULT_CITY, STORAGE_KEYS } from './consts';
import { QuickOrderContextProvider } from './context/QuickOrderContext';
import { StorageService } from './lib/StorageService';
import { CitiesNP } from './types';
function App() {
  const cityStorage = useMemo(() => new StorageService<CitiesNP>(STORAGE_KEYS.city.type, STORAGE_KEYS.city.key), []);
  useEffect(() => {
    if (!cityStorage.getItems()) cityStorage.setItems(DEFAULT_CITY);
  }, [cityStorage]);

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
