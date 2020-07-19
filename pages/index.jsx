import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function Home(props) {
  const { posts } = props;
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Body</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.body}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
