import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './SuggestedItems.module.scss';
import LoadingSpinner from '../../reusablecomps/LoadingSpinner';
import { Link } from 'react-router-dom';
import { fetchStoreItems } from '../../../actions/store';

interface Props {
	store?: any;
	fetchStoreItems: () => any;
}

const SuggestedItems = ({ store: { catalog, loading }, fetchStoreItems }: Props) => {
	useEffect(() => {
		fetchStoreItems();
	}, [fetchStoreItems]);
	const suggests = catalog.slice(0, 3).map((item: any, i: number) => {
		return (
			<div className={style.item} key={i}>
				<div className={style.img_container}>
					<img src={item.images[0].src} alt={item.title} />
				</div>
				<div className={style.item_desc}>
					<h3>{item.title}</h3>
				</div>
				<Link to={`/store/viewitem/${item.id}`}>
					<button>View</button>
				</Link>
			</div>
		);
	});

	return !loading ? (
		<div className={style.container}>
			<div className={style.inner}>
				<div className={style.column}>
					<div className={style.suggested_heading}>
						<h2>Suggested</h2>
					</div>
					<div className={style.grid}>{suggests}</div>
				</div>
			</div>
		</div>
	) : (
		<LoadingSpinner />
	);
};

SuggestedItems.propTypes = {
	store: PropTypes.object,
};

const mapStateToProps = (state: any) => ({
	store: state.store,
});

export default connect(mapStateToProps, { fetchStoreItems })(SuggestedItems);
