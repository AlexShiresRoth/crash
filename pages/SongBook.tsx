import React from 'react';
import { useEffect } from 'react';
// import PropTypes from 'prop-types';
import Layout from '../layout/Layout';
import BookComponent from '../songbook/BookComponent';

const SongBook = () => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.scrollTo({ top: 0 });
		}
	}, []);
	return (
		<Layout>
			<BookComponent />
		</Layout>
	);
};

SongBook.propTypes = {};

export default SongBook;
