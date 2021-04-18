import React, { useState } from 'react';
import style from './SearchBar.module.scss';
import { FaSearch } from 'react-icons/fa';
import { searchCatalog, clearSearch } from '../../../actions/store';
import { connect } from 'react-redux';

interface Props {
	searchCatalog: (data: any) => any;
	store?: any;
	clearSearch: () => any;
}

const SearchBar = ({ searchCatalog, clearSearch, store: { catalog, loading } }: Props) => {
	const [formData, setData] = useState({
		searchTerm: '',
		category: '',
	});

	const { searchTerm } = formData;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

	const onSelectChange = (e: React.FormEvent<HTMLSelectElement>) =>
		setData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

	const formSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		searchCatalog(formData);
	};

	const handleClearSearch = () => {
		clearSearch();
		setData({
			searchTerm: '',
			category: '',
		});
	};

	return (
		<div className={style.search}>
			<div className={style.form_container}>
				<form onSubmit={(e) => formSubmit(e)}>
					{!loading && catalog ? (
						<select onChange={(e) => onSelectChange(e)} name="searchTerm">
							{catalog.map((item: any, i: number) => {
								return (
									<option value={item.productType} key={i}>
										{item.productType}
									</option>
								);
							})}
						</select>
					) : (
						<p>Loading Categories...</p>
					)}

					<input
						name="searchTerm"
						value={searchTerm}
						onChange={(e) => onChange(e)}
						placeholder="Search store catalog"
					></input>
					<button onSubmit={(e) => formSubmit(e)}>
						<FaSearch />
					</button>
				</form>

				<div className={style.clear_btn}>
					<button onClick={(e) => handleClearSearch()}>Clear Search</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, { searchCatalog, clearSearch })(SearchBar);
