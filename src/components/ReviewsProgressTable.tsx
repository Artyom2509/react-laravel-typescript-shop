import { ColorsTypes, FormTargetType, IReview } from '../types';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, Badge, Table } from 'reactstrap';
import { Pane, Spinner } from 'evergreen-ui';
import { useTypedSelector } from '../hooks/useTypedSelector';
import api from '../api';
import { useActions } from '../hooks/useActions';
import ReviewForm from './Form/ReviewForm';
import { Rating } from 'primereact/rating';
import { shortText } from '../utils/short-text';

interface ReviewsProgressTableProps {
	headers?: Array<string | ReactNode>;
}

const ReviewsProgressTable: React.FC<ReviewsProgressTableProps> = ({
	headers = [],
	...restProps
}) => {
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const [target, setTarget] = useState(FormTargetType.update);
	const [current, setCurrent] = useState<number | undefined>();
	const [data, setData] = useState<IReview[]>([]);

	const token = useTypedSelector(({ auth }) => auth.token);
	const { error } = useActions();

	const modalToggle = (target: FormTargetType, id?: number) => {
		setModal(true);
		setTarget(target);
		if (id) setCurrent(id);
	};

	const loadItems = useCallback(async () => {
		setLoading(true);
		try {
			const res = await api.fetchAllReviews(token);
			setData(res.data);
			setLoading(false);
		} catch ({ message }) {
			setLoading(false);
			error({ message });
		}
	}, [error, token]);

	const removeItem = async (id: number) => {
		try {
			await api.removeReview(id, token);
			loadItems();
		} catch ({ message }) {
			error({ message });
		}
	};

	const toggleActive = async (id: number) => {
		try {
			await api.toggleReviewActive(id, token);
			loadItems();
		} catch ({ message }) {
			error({ message });
		}
	};

	useEffect(() => {
		loadItems();
	}, [loadItems]);

	const modalClose = () => {
		loadItems();
		setModal(false);
	};

	return (
		<>
			<div className="mb-2 text-center">
				<Button onClick={() => modalToggle(FormTargetType.create)}>
					Add New
				</Button>
			</div>

			<Table responsive hover {...restProps}>
				<thead>
					<tr className="text-capitalize align-middle text-center">
						{headers.map((item, index) => (
							<th key={index}>{item}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{data.map((review, index) => (
						<tr key={review.id}>
							<td className="align-middle text-center">{review.product_id}</td>
							<td className="align-middle text-center">{review.name}</td>
							<td className="align-middle text-center">{review.email}</td>
							<td className="align-middle text-center">
								{shortText(review.text, 20)}
							</td>
							<td className="align-middle text-center">
								<Rating
									readOnly
									cancel={false}
									value={+review.rating}
									stars={5}
								/>
							</td>
							<td className="align-middle text-center">
								{review.status ? (
									<Badge color="success">Accepted</Badge>
								) : (
									<Badge color="danger">Declined</Badge>
								)}
							</td>
							<td className="pt-4 text-center">
								{!review.status ? (
									<Button
										onClick={() => toggleActive(review.id)}
										color="success"
										size="sm"
										className="mr-1">
										Accept
									</Button>
								) : (
									<Button
										onClick={() => toggleActive(review.id)}
										color="danger"
										size="sm"
										className="mr-1">
										Decline
									</Button>
								)}
								<Button
									onClick={() => modalToggle(FormTargetType.update, review.id)}
									color={ColorsTypes.warning}
									size="sm"
									className="mr-1">
									Update
								</Button>
								<Button
									onClick={() => removeItem(review.id)}
									color={ColorsTypes.danger}
									size="sm"
									className="mr-1">
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{!data.length && !loading && (
				<div className="text-center">No reviews found.</div>
			)}
			{loading && (
				<Pane>
					<Spinner marginX="auto" marginY={30} />
				</Pane>
			)}

			<Modal isOpen={modal} toggle={modalClose} size="md">
				<ModalHeader toggle={modalClose}>Review info</ModalHeader>
				<ModalBody>
					<ReviewForm target={target} id={current} />
				</ModalBody>
			</Modal>
		</>
	);
};

ReviewsProgressTable.defaultProps = {
	headers: ['product', 'name', 'email', 'text', 'rating', 'status', 'actions'],
};

export default ReviewsProgressTable;
