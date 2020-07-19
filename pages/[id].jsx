import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import translateAction from '../store/actions/translateAction';

export default function Home({ photo }) {
  const dispatch = useDispatch();
  const { aboutUs } = useSelector((state) => state.translate);
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div>Loading...</div>
    );
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
        <pre>{JSON.stringify(photo, null, 4)}</pre>
        <p>{`title: ${photo.title}`}</p>
        <img src={photo.url} alt="icon" />
      </main>

    </div>
  );
}

Home.propTypes = {
  photo: PropTypes.instanceOf(Object),
};

Home.defaultProps = {
  photo: null,
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
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await axios({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/photos',
  })
    .then((res) => res.data.map((data) => ({
      params: {
        id: data.id.toString(),
      },
    })));
  return (
    {
      paths,
      fallback: true,
    }
  );
};
