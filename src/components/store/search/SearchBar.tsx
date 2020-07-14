import React, { useState } from 'react';
import style from './SearchBar.module.scss';
import { FaSearch } from 'react-icons/fa';
import { searchCatalog } from '../../../actions/store';
import { connect } from 'react-redux';

interface Props {
	searchCatalog: (data: any) => any;
}

const SearchBar = ({ searchCatalog }: Props) => {
	const [formData, setData] = useState({
		searchTerm: '',
	});

	const { searchTerm } = formData;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

	const formSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		searchCatalog(formData);
	};

	return (
		<div className={style.search}>
			<form onSubmit={(e) => formSubmit(e)}>
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

export default connect(null, { searchCatalog })(SearchBar);
