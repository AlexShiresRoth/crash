import React from 'react';
import PropTypes from 'prop-types';
import style from './StoreItem.module.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

interface Props {
	item: any;
	index: number;
	store?: any;
}

const StoreItem = ({ item, index, store: { loading } }: Props) => {
	return !loading ? (
		<div className={style.item} key={index}>
			<div className={style.img_container}>
				<img src={item.images[0].src} alt={item.title} />
			</div>
			<div className={style.heading}>
				<p>{item.title}</p>
			</div>

			<div className={style.price}>
				<p>
					<span>Price:</span>
					{'$' + item.variants[0].price}
				</p>
			</div>
			<div className={style.actions}>
				<Link to={`/merch/viewitem/${item.id}`}>
					<button>View</button>
				</Link>
			</div>
		</div>
	) : null;
};

StoreItem.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number.isRequired,
};

const mapStateToProps = (state: { store: any }) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(StoreItem);
