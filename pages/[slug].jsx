import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import axios from 'axios';
import getConfig from 'next/config';
import Button from '../components/button';
import SWRData from '../widgets/swr';

export default function Home({ photo, math }) {
  const [newPhoto, setPhoto] = useState(photo);
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
  useEffect(() => {
    setPhoto(photo);
  }, [photo]);

  const callService = async () => {
    await axios({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/photos/40',
    })
      .then((res) => setPhoto(res.data));
  };
  if (!newPhoto) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Button onClick={callService} />
        <p>{`title: ${newPhoto.title}`}</p>
        <pre>{`env: ${process.env.MY_ENV}`}</pre>
        {/* Will only be available on the server-side */}
        <pre>{`server env: ${serverRuntimeConfig.MY_SECRET}`}</pre>
        {/* Will be available on both server-side and client-side */}
        <pre>{`runtime env: ${publicRuntimeConfig.MY_ENDPOINT}`}</pre>
        <img src={newPhoto.url} alt="icon" />
        <pre>{math}</pre>
        <pre>{JSON.stringify(newPhoto, null, 4)}</pre>
        {/* only client side  */}
        <SWRData />
      </main>

    </div>
  );
}

Home.propTypes = {
  photo: PropTypes.instanceOf(Object),
  math: PropTypes.string,
};

Home.defaultProps = {
  photo: null,
  math: null,
};

export const getStaticProps = async ({ params }) => {
  const data = await axios({
    method: 'GET',
    url: `https://jsonplaceholder.typicode.com/photos/${params.slug}`,
  })
    .then((res) => res.data);
  return {
    props: {
      photo: data,
      math: Math.random(),
    },
  };
};

export const getStaticPaths = async () => (
  {
    paths: [{ params: { slug: '1' } }],
    fallback: true,
  }
);
