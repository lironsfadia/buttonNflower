import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';

import { useAuth } from '~/contexts/authProvider';
import { Plant } from '~/screens/PlantsScreen/plants';
import { FloweringReport } from '~/screens/ReportsScreen/reports';
import { supabase } from '~/utils/supabase';
import { formatDate } from '~/utils/time';

interface EventOutput {
  report: FloweringReport | undefined;
  reporter: any | undefined;
  plants: Plant[] | null;
  onLike: () => void;
  loading: boolean;
  time: string;
}

function useReport(): EventOutput {
  const isFocused = useIsFocused();
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [plants, setPlants] = useState<any | null>(null);
  const [report, setReport] = useState<any | null>(null);
  const [reporter, setReporter] = useState<User | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('ttt useReport', id);

  useEffect(() => {
    console.log('ttt inside useEffect', { id, typeOfId: typeof id });

    // Ensure id exists
    if (!id) {
      console.log('ttt no id provided');
      return;
    }
    const fetchReporter = async () => {
      try {
        setLoading(true);
        console.log('ttt data1');

        const { data, error } = await supabase
          .from('reports')
          .select('*, profiles(*)')
          .eq('id', id)
          .single();

        console.log('ttt data', data);
        setReporter(data.profiles);
        setLoading(false);
      } catch (e: unknown) {
        setError(e);
      }
    };
    const fetchPlants = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
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
        const { data, error } = await supabase.from('reports').select('*').eq('id', id).single();
        setReport(data);
        setLoading(false);
      } catch (e: unknown) {
        setError(e);
      }
    };
    console.log('ttt fetch');
    fetchPlants();
    fetchReport();
    fetchReporter();
  }, [id, isFocused]);

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
