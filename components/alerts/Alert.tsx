import React from 'react';
import style from './Alert.module.scss';
import { connect } from 'react-redux';

interface Props {
	alerts?: any;
}

const Alert = ({ alerts }: Props) => {
	console.log(alerts);
	return alerts
		.filter((alert: any) => alert.msg !== undefined)
		.map((alert: any, i: number) => {
			return (
				<div
					className={style.alert_box + ` ${alert.alertType === 'danger' ? style.danger : style.success}`}
					key={i}
				>
					<div className={style.container}>
						<p>{alert.msg}</p>
					</div>
				</div>
			);
		})
		.slice(0, 2);
};

const mapStateToProps = (state: any) => ({
	alerts: state.alerts,
});

export default connect(mapStateToProps, null)(Alert);
