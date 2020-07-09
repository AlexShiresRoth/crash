import React from 'react';
import style from './SearchBar.module.scss';
import { FaSearch } from 'react-icons/fa';
const SearchBar = (props: any) => {
	return (
		<div className={style.search}>
			<form>
				<input placeholder="Search store catalog"></input>
				<button>
					<FaSearch />
				</button>
			</form>
		</div>
	);
};

export default SearchBar;
