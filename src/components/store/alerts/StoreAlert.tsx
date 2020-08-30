import React from 'react';
import PropTypes from 'prop-types';
import style from './StoreAlert.module.scss';

interface Props {
	status: any;
	type: string;
}

const StoreAlert = ({ status, type = 'danger' }: Props) => {
	return (
		<div
			className={type === 'danger' ? `${style.alert_box} ${style.danger}` : `${style.alert_box} ${style.success}`}
		>
			<p>{status}</p>
		</div>
	);
};

StoreAlert.propTypes = {
	status: PropTypes.string,
};

export default StoreAlert;
