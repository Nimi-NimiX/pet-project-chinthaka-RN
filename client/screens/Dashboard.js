import { View } from 'react-native';
import Header from '../components/Header';
import Overview from '../components/Overview';
import Analytics from '../components/Analytics';

const Dashboard = () => {
  return (
    <View>
      <Header />
      <Overview />
      <Analytics />
    </View>
  );
};

export default Dashboard;
