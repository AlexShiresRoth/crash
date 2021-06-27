import React from 'react';
// import PropTypes from 'prop-types';
import Layout from '../layout/Layout';
import BookComponent from '../songbook/BookComponent';

const SongBook = () => {
	return (
		<Layout>
			<BookComponent />
		</Layout>
	);
};

SongBook.propTypes = {};

export default SongBook;
