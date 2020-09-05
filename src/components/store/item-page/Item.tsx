import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './Item.module.scss';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { findStoreItem } from '../../../actions/store';
import { addToCart, removeFromCart } from '../../../actions/store';
import LoadingSpinner from '../../reusablecomps/LoadingSpinner';
import StoreAlert from '../alerts/StoreAlert';

interface Props {
	store?: any;
	match?: any;
	findStoreItem: (id: string) => any;
	addToCart: (val: any) => any;
	removeFromCart: (val: any, id: string) => any;
}

type AllProps = Props & RouteComponentProps;

const Item = ({ store: { loading, foundItem }, match, findStoreItem, addToCart }: AllProps) => {
	useEffect(() => {
		findStoreItem(match.params.id);
	}, [match.params.id, findStoreItem]);

	const [selectedItem, selectItem] = useState<any>({
		option: null,
	});

	const { option } = selectedItem;
	//Handle alerting user if adding cart to item fails
	const [alerted, setAlert] = useState({
		sizeError: false,
		status: '',
	});

	const { sizeError, status } = alerted;

	const onChange = (e: React.FormEvent<HTMLSelectElement>) =>
		selectItem({ ...selectedItem, option: e.currentTarget.value });

	useEffect(() => {
		if (option !== '') setAlert({ sizeError: false, status: '' });
	}, [option]);

	const handleAddToCart = () => {
		return option
			? addToCart(selectedItem)
			: setAlert({
					sizeError: true,
					status: 'Please choose a size',
			  });
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleAddToCart();
	};
	return !loading && foundItem ? (
		<div className={style.container}>
			<div className={style.inner}>
				<div className={style.item}>
					<div className={style.col}>
						<div className={style.image_container}>
							<img src={foundItem.images[0].src} alt={foundItem.title} />
						</div>
					</div>
					<div className={style.col}>
						<div className={style.item_desc}>
							<h1>{foundItem.title}</h1>
							<h3>{foundItem.description}</h3>
							<p>
								Price: $
								{option
									? foundItem.variants.filter((variant: any) => {
											return variant.id === option;
									  })[0].price
									: foundItem.variants[0].price}
							</p>
						</div>
						<form onSubmit={(e) => onSubmit(e)}>
							{sizeError ? <StoreAlert status={status} type={'danger'} /> : null}
							<label>Choose a size</label>
							<select
								onChange={(e) => onChange(e)}
								style={sizeError ? { border: '2px solid #8f2b2bb0' } : {}}
								className={style.select_box}
							>
								<option>Choose a size</option>
								{foundItem.variants.map((variant: any, i: number) => {
									return variant.available ? (
										<option key={i} value={variant.id}>
											{variant.title}
										</option>
									) : (
										<option key={i}>{variant.title}: Out of Stock</option>
									);
								})}
							</select>
							<button onSubmit={(e) => onSubmit(e)}>Add To Cart</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className={style.container}>
			<div className={style.inner}>
				<LoadingSpinner />
			</div>
		</div>
	);
};

Item.propTypes = {
	store: PropTypes.object,
};

const mapStateToProps = (state: any) => ({
	store: state.store,
});

export default connect(mapStateToProps, { findStoreItem, addToCart, removeFromCart })(withRouter(Item));
