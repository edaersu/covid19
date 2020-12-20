import React from 'react';
import Root from './src';

const globalAny: any = global;

if (__DEV__) {
  globalAny.XMLHttpRequest = globalAny.originalXMLHttpRequest
    ? globalAny.originalXMLHttpRequest
    : globalAny.XMLHttpRequest;
}

globalAny.FormData = globalAny.originalFormData ? globalAny.originalFormData : globalAny.FormData;

export default function App() {
  return <Root />;
}
