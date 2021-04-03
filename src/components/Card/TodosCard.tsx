import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardText } from 'reactstrap';
import Todos from '../Todos';
import backgroundImage from '../../assets/img/bg/background_1920-2.jpg';
import { Todo } from '../../types';

interface TodosCardProps {
  image?: string,
  title?: string,
  subtitle?: string,
  todos: Todo[]
}


const TodosCard: React.FC<TodosCardProps> = ({ image, title, subtitle, todos, ...restProps }) => {
  return (
    <Card {...restProps}>
      <div className="position-relative">
        <CardImg src={image} />
        <CardImgOverlay className="bg-dark" style={{ opacity: 0.2 }}>
          <CardTitle className="text-white">{title}</CardTitle>
          <CardText className="text-white">{subtitle}</CardText>
        </CardImgOverlay>
      </div>
      <Todos todos={todos} />
    </Card>
  );
};

TodosCard.defaultProps = {
  image: backgroundImage,
  title: 'Tasks',
  subtitle: 'Due soon...',
};

export default TodosCard;
