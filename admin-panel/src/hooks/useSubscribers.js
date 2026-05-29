import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { fetchCollection } from '../services/firestoreHelpers';
import { useData } from './useData';

export const useSubscribers = () => {
  const { subscribers, setSubscribers } = useData();
  const [loading, setLoading] = useState(subscribers === null);

  useEffect(() => {
    if (subscribers !== null) return; // cache hit — skip fetch
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchCollection('subscribers');
        // Latest first
        data.sort(
          (a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt)
        );
        setSubscribers(data);
      } catch (error) {
        console.error('Error fetching subscribers:', error);
        toast.error('Failed to load subscribers.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [subscribers, setSubscribers]);

  const downloadCSV = () => {
    try {
      const headers = ['Email', 'Subscribed At'];
      const rows = (subscribers ?? []).map((s) => [s.email, s.subscribedAt]);
      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.map((field) => `"${field}"`).join(',')),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `subscribers-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('CSV downloaded successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to download CSV.');
    }
  };

  const refresh = () => setSubscribers(null);

  return {
    subscribers: subscribers ?? [],
    loading,
    downloadCSV,
    refresh,
  };
};
