import React from 'react';
import useSWR from 'swr';

export default function home() {
  const { data } = useSWR('https://jsonplaceholder.typicode.com/photos/30');
  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}
