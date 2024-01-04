import RNFetchBlob from 'rn-fetch-blob';
import {Platform, PermissionsAndroid} from 'react-native';

/// grant permission in android
export const getDownloadPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'File Download Permission',
        message: 'Your permission is required to save Files to your device',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
  } catch (err) {
    console.log('err', err);
  }
};

export const downloadFile = async (url: string) => {
  // Get the app's cache directory
  // const {config, fs} = RNFetchBlob;
  // const cacheDir = fs.dirs.DownloadDir;
  const {
    dirs: {DownloadDir, DocumentDir},
  } = RNFetchBlob.fs;
  const isIOS = Platform.OS === 'ios';
  const aPath = Platform.select({ios: DocumentDir, android: DocumentDir});
  const filename = url.split('/').pop();

  const fPath = `${aPath}/${filename}`;

  try {
    // Download the file and save it to the cache directory
    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: fPath,
        appendExt: 'pdf',
      },
    });

    const response = await RNFetchBlob.config(configOptions).fetch('GET', url);

    // Return the path to the downloaded file
    return response?.path();
  } catch (error) {
    console.error(error);
    return null;
  }
};
