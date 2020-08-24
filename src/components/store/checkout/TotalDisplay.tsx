import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './TotalDisplay.module.scss';
import { connect } from 'react-redux';

interface Props {
	store?: any;
}

const TotalDisplay = ({ store: { cart, loading } }: Props) => {
	const getTotal = () => {
		return cart.reduce((acc: any, item: any) => {
			return (acc += parseInt(item.price));
		}, 0);
	};

	useEffect(() => {
		getTotal();
	});

	return (
		<div className={style.total_display}>
			<p>
				<span>subtotal:</span> ${parseFloat(getTotal()).toFixed(2)}
			</p>
		</div>
	);
};

TotalDisplay.propTypes = {
	store: PropTypes.object,
};

const mapStateToProps = (state: any) => ({
	store: state.store,
});

export default connect(mapStateToProps, null)(TotalDisplay);
