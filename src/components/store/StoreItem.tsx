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
			<div className={style.heading}>
				<img src={item.images[0].src} alt={item.title} />
				<p>{item.title}</p>
			</div>
			<div className={style.variations}>
				<>
					<div className={style.row}>
						<p>Sizes/Colors Available</p>
					</div>
					<div className={style.row}>
						<ul>
							{item.variants.map((variant: any, i: number) => {
								return <li key={i}>{variant.title}</li>;
							})}
						</ul>
					</div>
				</>
			</div>
			<div className={style.price}>
				<p>
					<span>Price:</span>
					{'$' + item.variants[0].price}
				</p>
			</div>
			<div className={style.actions}>
				<Link to={`/store/viewitem/${item.id}`}>
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
