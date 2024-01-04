import * as React from 'react';

import {Image, StyleSheet, Text, View} from 'react-native';
import PdfThumbnail, {type ThumbnailResult} from 'react-native-pdf-thumbnail';
import {downloadFile} from './utils';
import {useCallback} from 'react';

type ErrorType = {code: string; message: string};

export default function RNThumbnails() {
  const [thumbnail, setThumbnail] = React.useState<
    ThumbnailResult | undefined
  >();
  const [error, setError] = React.useState<ErrorType | undefined>();
  const linkUrl =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  const getThumbnails = useCallback(async () => {
    try {
      const localPath = await downloadFile(linkUrl);
      const result = await PdfThumbnail.generate(localPath || '', 0);
      setThumbnail(result);
      setError(undefined);
    } catch (err) {
      console.log('error generating thumbnail', err);
      setThumbnail(undefined);
      setError(err as ErrorType);
    }
  }, []);

  React.useEffect(() => {
    getThumbnails();
  }, [getThumbnails]);

  const thumbnailResult = thumbnail ? (
    <>
      <Image
        source={thumbnail}
        resizeMode="contain"
        style={styles.thumbnailImage}
      />
      <Text style={styles.thumbnailInfo}>uri: {thumbnail.uri}</Text>
      <Text style={styles.thumbnailInfo}>width: {thumbnail.width}</Text>
      <Text style={styles.thumbnailInfo}>height: {thumbnail.height}</Text>
    </>
  ) : null;

  const thumbnailError = error ? (
    <>
      <Text style={styles.thumbnailError}>Error code: {error.code}</Text>
      <Text style={styles.thumbnailError}>Error message: {error.message}</Text>
    </>
  ) : null;

  return (
    <View style={styles.container}>
      <View style={styles.thumbnailPreview}>
        {thumbnailResult}
        {thumbnailError}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  thumbnailPreview: {
    padding: 20,
    alignItems: 'center',
  },
  thumbnailImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  thumbnailInfo: {
    color: 'darkblue',
  },
  thumbnailError: {
    color: 'crimson',
  },
});
