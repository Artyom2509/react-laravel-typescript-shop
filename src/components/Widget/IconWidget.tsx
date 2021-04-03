import React from 'react';
import classNames from 'classnames';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { TagTypes } from '../../types';
import { IconType } from 'react-icons/lib';



interface IconWidgetProps {
  bgColor?: string,
  icon: TagTypes | IconType,
  iconProps?: object,
  title?: string,
  inverse?: boolean,
  className?: string,
  subtitle?: string,
};

const IconWidget: React.FC<IconWidgetProps> = ({
  bgColor,
  icon: Icon,
  iconProps,
  title,
  subtitle,
  className,
  ...restProps
}) => {
  const classes = classNames('cr-widget', className, {
    [`bg-${bgColor}`]: bgColor,
  });
  return (
    <Card inverse className={classes} {...restProps}>
      <CardBody className="cr-widget__icon">
        <Icon size={50} {...iconProps} />
      </CardBody>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
      </CardBody>
    </Card>
  );
};


IconWidget.defaultProps = {
  bgColor: 'primary',
  icon: TagTypes.span,
  iconProps: { size: 50 },
};

export default IconWidget;
