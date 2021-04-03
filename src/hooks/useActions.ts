import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/action-creators';
import { show, success, error, info } from 'react-notification-system-redux';

export const useActions = () => {
	const dispatch = useDispatch();

	return useMemo(
		() =>
			bindActionCreators({ ...actions, show, success, error, info }, dispatch),
		[dispatch]
	);
};
