import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import translateAction from '../store/actions/translateAction';

export default function Home({ photo, math }) {
  const dispatch = useDispatch();
  const [newPhoto, setPhoto] = useState(photo);
  const { aboutUs } = useSelector((state) => state.translate);
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
        <h1>{aboutUs}</h1>
        <button type="button" className="btn btn-primary" onClick={() => dispatch(translateAction('th'))}>Translate</button>
        <button type="button" className="btn btn-danger" onClick={() => callService()}>ChangeData</button>
        <pre>{JSON.stringify(newPhoto, null, 4)}</pre>
        <p>{`title: ${newPhoto.title}`}</p>
        <img src={newPhoto.url} alt="icon" />
        <pre>{math}</pre>
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
    url: `https://jsonplaceholder.typicode.com/photos/${params.id}`,
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
    paths: [{ params: { id: '1' } }],
    fallback: true,
  }
);
