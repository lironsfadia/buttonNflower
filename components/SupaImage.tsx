import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import { supabase } from '~/utils/supabase';

interface Props {
  bucketName: string;
  path: string | undefined;
  className?: string;
  height?: number;
}

export default function SupaImage({ bucketName, path, className, height = 200 }: Props) {
  const [uri, setUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (path) {
      downloadImage(path);
    }
  }, [path]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from(bucketName).download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setUri(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message);
      }
    }
  }

  if (!uri) {
    return <View style={{ height }} className={`${className} bg-slate-300`} />;
  }

  return <Image source={{ uri }} style={{ height }} className={className} />;
}
