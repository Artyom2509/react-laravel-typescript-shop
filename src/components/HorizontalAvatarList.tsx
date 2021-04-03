import Avatar from './Avatar';
import React, { Fragment } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { TagTypes } from '../types';

interface HorizontalAvatarListProps {
	tag?: TagTypes;
	avatars: Array<{ avatar: string; name: string }>;
	avatarProps: object;
	reversed?: boolean;
}

const HorizontalAvatarList: React.FC<HorizontalAvatarListProps> = ({
	tag: Tag = TagTypes.div,
	avatars,
	avatarProps,
	reversed,
	...restProps
}) => {
	let leng = reversed ? avatars.length + 1 : 1;
	const count = reversed ? () => leng-- : () => leng++;

	return (
		<Tag className="d-flex align-items-center" {...restProps}>
			{avatars &&
				avatars.map(({ avatar, name }, i) => {
					const index = count();
					const isFirstItem = i === 0;

					return (
						<Fragment key={index}>
							<Avatar
								{...avatarProps}
								id={`HorizontalAvatarList-avatar-${index}`}
								src={avatar}
								style={{
									zIndex: index,
									border: '3px solid #fff',
									marginLeft: !isFirstItem && -20,
									marginBottom: '20px',
									marginTop: '20px',
								}}
							/>

							{!!name && (
								<UncontrolledTooltip
									delay={{ show: 0, hide: 0 }}
									target={`HorizontalAvatarList-avatar-${index}`}>
									{name}
								</UncontrolledTooltip>
							)}
						</Fragment>
					);
				})}
		</Tag>
	);
};

HorizontalAvatarList.defaultProps = {
	tag: TagTypes.div,
	avatars: [],
	avatarProps: {},
	reversed: false,
};

export default HorizontalAvatarList;
