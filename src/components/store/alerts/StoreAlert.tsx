import React from 'react';
import PropTypes from 'prop-types';
import style from './StoreAlert.module.scss';

interface Props {
	status: any;
}

const StoreAlert = ({ status }: Props) => {
	return (
		<div className={style.alert_box}>
			<p>{status}</p>
		</div>
	);
};

StoreAlert.propTypes = {
	status: PropTypes.string,
};

export default StoreAlert;
