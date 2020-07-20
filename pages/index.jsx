import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/table';
import Button from '../components/button';
import translateAction from '../redux/actions/locale';

export default function Home(props) {
  const { posts } = props;
  const dispatch = useDispatch();
  const { aboutUs } = useSelector((state) => state.translate);
  return (
    <div className="container">
      <main>
        <h1>{aboutUs}</h1>
        <Button onClick={() => dispatch(translateAction('th'))} />
        <Table value={posts} />
      </main>
    </div>
  );
}

Home.propTypes = {
  posts: PropTypes.instanceOf(Array).isRequired,
};

export const getStaticProps = async () => {
  const data = await axios({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts/',
  })
    .then((res) => res.data);
  return {
    props: {
      posts: data,
    },
  };
};
