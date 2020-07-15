import React, { useState } from 'react';
import style from './SearchBar.module.scss';
import { FaSearch } from 'react-icons/fa';
import { searchCatalog } from '../../../actions/store';
import { connect } from 'react-redux';
import LoadingSpinner from '../../reusablecomps/LoadingSpinner';

interface Props {
	searchCatalog: (data: any) => any;
	store?: any;
}

const SearchBar = ({ searchCatalog, store: { categories, loading } }: Props) => {
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

	return (
		<div className={style.search}>
			<form onSubmit={(e) => formSubmit(e)}>
				{!loading && categories.objects ? (
					<select onChange={(e) => onSelectChange(e)} name="searchTerm">
						{categories.objects.map((cat: any, i: number) => {
							return (
								<option value={cat.category_data.name} key={i}>
									{cat.category_data.name}
								</option>
							);
						})}
					</select>
				) : (
					<LoadingSpinner />
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
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, { searchCatalog })(SearchBar);
