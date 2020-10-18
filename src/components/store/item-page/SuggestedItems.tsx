import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './SuggestedItems.module.scss';
import LoadingSpinner from '../../reusablecomps/LoadingSpinner';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { fetchStoreItems } from '../../../actions/store';

interface Props {
	store?: any;
	fetchStoreItems: () => any;
}

interface RouteParams {
	id: string;
}

type AllProps = Props & RouteComponentProps<RouteParams>;

const SuggestedItems = ({ store: { catalog, loading }, fetchStoreItems, match: { params } }: AllProps) => {
	useEffect(() => {
		fetchStoreItems();
	}, [fetchStoreItems]);
	const suggests = catalog
		.filter((catItem: any) => {
			return catItem.id !== params.id;
		})
		.map((item: any, i: number) => {
			return (
				<div className={style.item} key={i}>
					<div className={style.img_container}>
						<img src={item.images[0].src} alt={item.title} />
					</div>
					<div className={style.item_desc}>
						<h3>{item.title}</h3>
						<p>Price: ${item.variants[0].price}</p>
						<Link to={`/store/viewitem/${item.id}`}>
							<button>View</button>
						</Link>
					</div>
				</div>
			);
		})
		.slice(0, 6);

	return !loading ? (
		<div className={style.container}>
			<div className={style.inner}>
				<div className={style.column}>
					<div className={style.suggested_heading}>
						<h2>You may also like</h2>
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

export default connect(mapStateToProps, { fetchStoreItems })(withRouter(SuggestedItems));
