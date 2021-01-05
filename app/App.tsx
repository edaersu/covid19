import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { ConfigInterface, SWRConfig } from 'swr';
import { fetcherFn } from 'swr/dist/types';
import Root from './src';
import WelcomeModal from './src/Components/WelcomeModal';
import request from './src/utils/request';

const globalAny: any = global;

if (__DEV__) {
  globalAny.XMLHttpRequest = globalAny.originalXMLHttpRequest
    ? globalAny.originalXMLHttpRequest
    : globalAny.XMLHttpRequest;
}

globalAny.FormData = globalAny.originalFormData ? globalAny.originalFormData : globalAny.FormData;

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (loadingComplete) {
      setModalVisible(true);
    }
  }, [loadingComplete]);

  useEffect(() => {
    const checkForOTAUpdates = async () => {
      try {
        await SplashScreen.preventAutoHideAsync().catch(() => {});
        const update = await Updates.checkForUpdateAsync();
        // await SplashScreen.preventAutoHideAsync().catch(() => {});
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (e) {
        //
      } finally {
        await SplashScreen.hideAsync().catch(() => {});
      }
    };
    checkForOTAUpdates();
  }, []);
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync().catch(() => {});
      } finally {
        setLoadingComplete(true);
        await SplashScreen.hideAsync().catch(() => {});
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  const onSuccessSwrRequest = (
    _data: any,
    _key: string,
    _config: ConfigInterface<any, any, fetcherFn<any>>,
  ) => {
    // might be required for some stuff
  };

  return (
    <SWRConfig
      value={{
        errorRetryCount: 0,
        revalidateOnFocus: false, // enable it when required, it might be disturbing for some requests
        dedupingInterval: 10 * 1000,
        fetcher: (url: string, opts?: any) => request(url, opts).then(res => res.data),
        onSuccess: onSuccessSwrRequest,
      }}
    >
      <StatusBar animated barStyle="light-content" />
      <Root />
      <WelcomeModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
      />
    </SWRConfig>
  );
}
