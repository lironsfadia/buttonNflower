import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { useAuth } from '~/contexts/authProvider';
import { supabase } from '~/utils/supabase';
import { formatDate } from '~/utils/time';
import { Plant } from '~/types/plants';

interface EventOutput {
  report: FloweringReport | undefined;
  reporter: any | undefined;
  plants: Plant[] | null;
  onLike: () => void;
  loading: boolean;
  time: string;
}

function useReport(): EventOutput {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [plants, setPlants] = useState<any | null>(null);
  const [report, setReport] = useState<any | null>(null);
  const [reporter, setReporter] = useState<any | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReporter = async () => {
      try {
        setLoading(true);
        let { data, error } = await supabase
          .from('reports')
          .select('*, profiles(*)')
          .eq('id', id)
          .single();

        setReporter(data.profiles);
        setLoading(false);
      } catch (e: unknown) {
        setError(e);
      }
    };
    const fetchPlants = async () => {
      try {
        setLoading(true);
        let { data, error } = await supabase
          .from('flower_report_plants')
          .select('*, plants(*)')
          .eq('reportId', id);

        setPlants(data?.map((d) => d.plants));
        setLoading(false);
      } catch (e: unknown) {
        setError(e);
      }
    };

    const fetchReport = async () => {
      try {
        setLoading(true);
        let { data, error } = await supabase.from('reports').select('*').eq('id', id).single();
        setReport(data);
        setLoading(false);
      } catch (e: unknown) {
        setError(e);
      }
    };
    fetchPlants();
    fetchReport();
    fetchReporter();
  }, [id]);

  const { reportDate } = report || {};
  const time = formatDate(reportDate);

  const onLike = async () => {};
  // const onAttend = async () => {
  //   try {
  //     await supabase
  //       .from('attendance')
  //       .insert([{ event_id: id, user_id: user?.id }])
  //       .select()
  //       .single();

  //     setAttendance({ event_id: id, user_id: user?.id });
  //     alert('You have successfully RSVPed to this event');
  //   } catch (e: unknown) {
  //     alert('An error occurred while RSVPing to this event');
  //   }
  // };

  return { report, plants, onLike, loading, time, reporter };
}

export default useReport;
