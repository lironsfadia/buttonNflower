import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';

import { useAuth } from '~/contexts/authProvider';
import { Plant, Report, User } from '~/types/db';
import { supabase } from '~/utils/supabase';
import { formatDate } from '~/utils/time';

interface EventOutput {
  report: Report | null;
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
  const [report, setReport] = useState<Report | undefined>(undefined);
  const [reporter, setReporter] = useState<User | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure id exists
    if (!id) {
      return;
    }
    const fetchReporter = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
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
        const { data, error } = await supabase
          .from('flower_report_plants')
          .select('*, plants(*)')
          .eq('report_id', id);

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
        if (!error) {
          setReport(data);
        } else {
          setError(error);
        }
        setLoading(false);
      } catch (e: unknown) {
        setError(e);
      }
    };
    fetchPlants();
    fetchReport();
    fetchReporter();
  }, [id, isFocused]);

  const { created_at } = report || {};
  const time = formatDate(created_at);

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
