import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Image, Button, ActivityIndicator } from 'react-native';

import { supabase } from '~/utils/supabase';

interface Props {
  size: number;
  url: string | null;
  onUpload?: (filePath: string) => void;
  bucketName: string;
}

export default function Avatar({ url, size = 150, onUpload, bucketName }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (url || filePath) {
      downloadImage(filePath || url || '');
    }
  }, [url, filePath]);

  async function downloadImage(path: string) {
    console.log({ path });
    try {
      const { data, error } = await supabase.storage.from(bucketName).download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message);
      }
    }
  }

  async function uploadAvatar() {
    let newFilePath;
    try {
      setUploading(true);

      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to only images
        allowsMultipleSelection: false, // Can only select one image
        allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
        quality: 1,
        exif: false, // We don't want nor need that data.
      };

      const result = await ImagePicker.launchImageLibraryAsync(options);

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log('User cancelled image picker.');
        return;
      }

      const image = result.assets[0];

      if (!image.uri) {
        throw new Error('No image uri!'); // Realistically, this should never happen, but just in case...
      }

      // Check file size (50MB limit on free plan)
      const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes
      if (image.fileSize && image.fileSize > MAX_FILE_SIZE) {
        throw new Error(
          `File size too large. Maximum size is 50MB, your file is ${(image.fileSize / (1024 * 1024)).toFixed(2)}MB`
        );
      }
      console.log(`File size: ${((image.fileSize || 0) / (1024 * 1024)).toFixed(2)}MB`);

      const fileExt = image.uri.split('.').pop();
      newFilePath = `${Date.now()}.${fileExt}`;

      const arraybuffer = await FileSystem.readAsStringAsync(image.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(newFilePath, decode(arraybuffer), {
          contentType: mime.getType(image.uri) || 'image/jpeg',
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(newFilePath);

      onUpload(newFilePath); // Update this to pass the full URL
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.name, error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
      setFilePath(newFilePath || null);
    }
  }

  return (
    <View>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      <View>
        <Button
          title={uploading ? 'Uploading ...' : 'Upload'}
          onPress={uploadAvatar}
          disabled={uploading}
        />
        {uploading && <ActivityIndicator size="small" color="#0000ff" />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 5,
    overflow: 'hidden',
    maxWidth: '100%',
  },
  image: {
    objectFit: 'cover',
    paddingTop: 0,
  },
  noImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
