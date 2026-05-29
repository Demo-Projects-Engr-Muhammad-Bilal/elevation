import { useSubscribers } from '../../hooks/useSubscribers';
import PageLoader from '../ui/PageLoader';
import SubscribersList from './SubscribersList';

export default function SubscriberManager() {
  const { subscribers, loading, downloadCSV } = useSubscribers();

  if (loading) return <PageLoader />;

  return (
    <div>
      <SubscribersList
        subscribers={subscribers}
        onDownloadCSV={downloadCSV}
      />
    </div>
  );
}
