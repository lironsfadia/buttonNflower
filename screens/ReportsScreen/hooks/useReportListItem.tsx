import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import { supabase } from '~/utils/supabase';

const useReportListItem = (reportId: number) => {
  const isFocused = useIsFocused();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if report is favorited
  useEffect(() => {
    const checkFavorite = async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select()
        .eq('report_id', reportId)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "not found" error
        console.error('Error checking favorite:', error);
        return;
      }

      setIsFavorite(!!data);
    };

    checkFavorite();
  }, [reportId, isFocused]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await supabase.from('favorites').delete().eq('report_id', reportId);
      } else {
        await supabase.from('favorites').insert([{ report_id: reportId }]);
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return { isFavorite, toggleFavorite };
};

export default useReportListItem;
