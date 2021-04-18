import React from 'react';
import PropTypes from 'prop-types';
import style from './Viewresults.module.scss';

type Props = {
	searchTerm: string;
	resultAmt: number;
};

const ViewResults = ({ searchTerm, resultAmt }: Props) => {
	return (
		<div className={style.results_bar}>
			<div className={style.content}>
				<h2>Viewing Results for: {searchTerm}</h2>
				<h4>Showing {resultAmt}</h4>
			</div>
		</div>
	);
};

ViewResults.propTypes = {
	searchTerm: PropTypes.string,
};

export default ViewResults;
