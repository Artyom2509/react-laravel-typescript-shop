import React from 'react';
import {
	ListGroup,
	ListGroupItem,
	FormGroup,
	Label,
	Input,
	Button,
} from 'reactstrap';
import { Todo } from '../types';

interface TodosProps {
	todos: Todo[];
}

const Todos: React.FC<TodosProps> = ({ todos = [], ...restProps }) => {
	return (
		<ListGroup flush {...restProps}>
			{todos.map(({ id, title, done } = {}) => (
				<ListGroupItem key={id} className="border-0">
					<FormGroup check>
						<Label check>
							<Input type="checkbox" checked={done} readOnly />
							{done ? <strike>{title}</strike> : <span>{title}</span>}
						</Label>
					</FormGroup>
				</ListGroupItem>
			))}
			<Button block>Add</Button>
		</ListGroup>
	);
};

export default Todos;
