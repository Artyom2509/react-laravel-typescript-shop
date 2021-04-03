import Page from '../components/Page';
import Typography from '../components/Typography';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { TagTypes } from '../types';

const TypographyPage = () => {
	return (
		<Page
			title="Typography"
			breadcrumbs={[{ name: 'typography', active: true }]}>
			<Row>
				<Col>
					<Card>
						<CardHeader>Headings</CardHeader>
						<CardBody>
							<Typography type={TagTypes.h1}>h1 Heading</Typography>
							<Typography type={TagTypes.h2}>h2 Heading</Typography>
							<Typography type={TagTypes.h3}>h3 Heading</Typography>
							<Typography type={TagTypes.h4}>h4 Heading</Typography>
							<Typography type={TagTypes.h5}>h5 Heading</Typography>
							<Typography type={TagTypes.h6}>h6 Heading</Typography>
						</CardBody>
					</Card>
				</Col>

				<Col>
					<Card>
						<CardHeader>Display</CardHeader>
						<CardBody>
							<Typography type={TagTypes['display-1']}>Display 1</Typography>
							<Typography type={TagTypes['display-2']}>Display 2</Typography>
							<Typography type={TagTypes['display-3']}>Display 3</Typography>
							<Typography type={TagTypes['display-4']}>Display 4</Typography>
						</CardBody>
					</Card>
				</Col>
			</Row>

			<Row className="mb-3" />

			<Row>
				<Col>
					<Card>
						<CardHeader>Text Colors</CardHeader>
						<CardBody>
							<Typography className="text-primary">.text-primary</Typography>
							<Typography className="text-secondary">
								.text-secondary
							</Typography>
							<Typography className="text-success">.text-success</Typography>
							<Typography className="text-danger">.text-danger</Typography>
							<Typography className="text-warning">.text-warning</Typography>
							<Typography className="text-info">.text-info</Typography>
							<Typography className="text-light bg-dark">
								.text-light
							</Typography>
							<Typography className="text-dark">.text-dark</Typography>
							<Typography className="text-muted">.text-muted</Typography>
							<Typography className="text-white bg-dark">
								.text-white
							</Typography>
						</CardBody>
					</Card>
				</Col>

				<Col>
					<Card>
						<CardHeader>Inline text elements</CardHeader>
						<CardBody>
							<p>
								You can use the mark tag to <mark>highlight</mark> text.
							</p>
							<p>
								<del>
									This line of text is meant to be treated as deleted text.
								</del>
							</p>
							<p>
								<s>
									This line of text is meant to be treated as no longer
									accurate.
								</s>
							</p>
							<p>
								<ins>
									This line of text is meant to be treated as an addition to the
									document.
								</ins>
							</p>
							<p>
								<u>This line of text will render as underlined</u>
							</p>
							<p>
								<small>
									This line of text is meant to be treated as fine print.
								</small>
							</p>
							<p>
								<strong>This line rendered as bold text.</strong>
							</p>
							<p>
								<em>This line rendered as italicized text.</em>
							</p>
						</CardBody>
					</Card>
				</Col>
			</Row>

			<Row>
				<Col>
					<Card>
						<CardHeader>Blockquote</CardHeader>
						<CardBody>
							<Typography type={TagTypes.blockquote}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
								posuere erat a ante.
							</Typography>
						</CardBody>
					</Card>
				</Col>

				<Col>
					<Card>
						<CardHeader>Lead</CardHeader>
						<CardBody>
							<Typography type={TagTypes.lead}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
								posuere erat a ante.
							</Typography>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Page>
	);
};

export default TypographyPage;
