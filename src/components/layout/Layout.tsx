import React from 'react';
import PropTypes from 'prop-types';

interface Props {
	children: any;
}

const Layout = ({ children }: Props) => {
	return <main>{children}</main>;
};

Layout.propTypes = {};

export default Layout;
