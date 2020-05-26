import React from 'react';
import PropTypes from 'prop-types';
import style from './Layout.module.scss';

interface Props {
	children: any;
}

const Layout = ({ children }: Props) => {
	return <main className={style.main}>{children}</main>;
};

Layout.propTypes = {};

export default Layout;
