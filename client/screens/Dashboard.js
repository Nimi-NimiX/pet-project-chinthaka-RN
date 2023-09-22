import { ScrollView } from 'react-native';
import Header from '../components/Header';
import Overview from '../components/Overview';
import Analytics from '../components/Analytics';
import Table from '../components/Table';

const Dashboard = () => {
  return (
    <ScrollView>
      <Header />
      <Overview />
      <Analytics />
      <Table />
    </ScrollView>
  );
};

export default Dashboard;
