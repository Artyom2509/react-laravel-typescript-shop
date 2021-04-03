import { Table, Progress } from 'reactstrap';
import Avatar from './Avatar';
import withBadge from '../hocs/withBadge';
import { ColorsTypes, PositionMapTypes } from '../types';
import { IUser } from '../types';
import { ReactNode } from 'react';

const AvatarWithBadge = withBadge({
	position: PositionMapTypes.bottomRight,
	color: ColorsTypes.success,
})(Avatar);

interface UserProgressTableProps {
	headers: Array<string | ReactNode>
	usersData: IUser[];
}

const UserProgressTable: React.FC<UserProgressTableProps> = ({
	headers = [],
	usersData = [],
	...restProps
}) => {
	return (
		<Table responsive hover {...restProps}>
			<thead>
				<tr className="text-capitalize align-middle text-center">
					{headers.map((item, index) => (
						<th key={index}>{item}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{usersData.map(({ avatar, name, created_at, progress }, index) => (
					<tr key={index}>
						<td className="align-middle text-center">
							<AvatarWithBadge src={avatar} />
						</td>
						<td className="align-middle text-center">{name}</td>
						<td className="align-middle text-center">{created_at}</td>
						<td className="align-middle text-center">
							<Progress value={progress} style={{ height: 5 }} />
						</td>
						<td className="align-middle text-center">{progress}%</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default UserProgressTable;
