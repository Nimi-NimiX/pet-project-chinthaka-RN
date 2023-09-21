import { SafeAreaView } from 'react-native-safe-area-context';
import Dashboard from './screens/Dashboard';
import { StatusBar } from 'expo-status-bar';
import Store from './store/Store';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <Store.Provider>
      <PaperProvider>
        <StatusBar style="auto" />
        <SafeAreaView style={{ flex: 1 }}>
          <Dashboard />
        </SafeAreaView>
      </PaperProvider>
    </Store.Provider>
  );
}
