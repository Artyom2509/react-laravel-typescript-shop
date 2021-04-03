import React from 'react';

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
} from 'reactstrap';

import Page from '../components/Page';
import { ColorsTypes } from '../types';

const BadgePage: React.FC = () => {
  return (
    <Page title="Badges" breadcrumbs={[{ name: 'badges', active: true }]}>
      <Row>
        <Col md={6}>
          <Card>
            <CardHeader>Scale to parent</CardHeader>
            <CardBody>
              <h1>
                Heading <Badge color={ColorsTypes.secondary}>New</Badge>
              </h1>
              <h2>
                Heading <Badge color={ColorsTypes.secondary}>New</Badge>
              </h2>
              <h3>
                Heading <Badge color={ColorsTypes.secondary}>New</Badge>
              </h3>
              <h4>
                Heading <Badge color={ColorsTypes.secondary}>New</Badge>
              </h4>
              <h5>
                Heading <Badge color={ColorsTypes.secondary}>New</Badge>
              </h5>
              <h6>
                Heading <Badge color={ColorsTypes.secondary}>New</Badge>
              </h6>
            </CardBody>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <CardHeader>with buttons</CardHeader>
            <CardBody>
              <Button color={ColorsTypes.primary} className="mr-1">
                Notifications <Badge color={ColorsTypes.secondary}>4</Badge>
              </Button>
              <Button color={ColorsTypes.info} className="mr-1">
                Notifications <Badge color={ColorsTypes.danger}>4</Badge>
              </Button>
              <Button color={ColorsTypes.secondary} className="mr-1">
                Notifications <Badge color={ColorsTypes.secondary}>4</Badge>
              </Button>
            </CardBody>

            <CardBody>
              <Button color={ColorsTypes.primary} outline className="mr-1">
                Notifications <Badge color={ColorsTypes.primary}>4</Badge>
              </Button>
              <Button color={ColorsTypes.info} outline className="mr-1">
                Notifications <Badge color={ColorsTypes.info}>4</Badge>
              </Button>
              <Button color={ColorsTypes.secondary} outline className="mr-1">
                Notifications <Badge color={ColorsTypes.secondary}>4</Badge>
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card>
            <CardHeader>Contextual variations</CardHeader>
            <CardBody>
              <Badge color={ColorsTypes.secondary} className="mr-1">
                Primary
              </Badge>
              <Badge color={ColorsTypes.secondary} className="mr-1">
                Secondary
              </Badge>
              <Badge color={ColorsTypes.secondary} className="mr-1">
                Success
              </Badge>
              <Badge color={ColorsTypes.danger} className="mr-1">
                Danger
              </Badge>
              <Badge color={ColorsTypes.warning} className="mr-1">
                Warning
              </Badge>
              <Badge color={ColorsTypes.info} className="mr-1">
                Info
              </Badge>
              <Badge color={ColorsTypes.secondary} className="mr-1">
                Light
              </Badge>
              <Badge color={ColorsTypes.secondary} className="mr-1">
                Dark
              </Badge>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <CardHeader>Pills</CardHeader>
            <CardBody>
              <Badge color={ColorsTypes.primary} pill className="mr-1">
                Primary
              </Badge>
              <Badge color={ColorsTypes.secondary} pill className="mr-1">
                Secondary
              </Badge>
              <Badge color={ColorsTypes.success} pill className="mr-1">
                Success
              </Badge>
              <Badge color={ColorsTypes.danger} pill className="mr-1">
                Danger
              </Badge>
              <Badge color={ColorsTypes.warning} pill className="mr-1">
                Warning
              </Badge>
              <Badge color={ColorsTypes.info} pill className="mr-1">
                Info
              </Badge>
              <Badge color={ColorsTypes.light} pill className="mr-1">
                Light
              </Badge>
              <Badge color={ColorsTypes.dark} pill className="mr-1">
                Dark
              </Badge>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <CardHeader>Links</CardHeader>
            <CardBody>
              <Badge href="#" color={ColorsTypes.primary} className="mr-1">
                Primary
              </Badge>
              <Badge href="#" color={ColorsTypes.secondary} className="mr-1">
                Secondary
              </Badge>
              <Badge href="#" color={ColorsTypes.success} className="mr-1">
                Success
              </Badge>
              <Badge href="#" color={ColorsTypes.danger} className="mr-1">
                Danger
              </Badge>
              <Badge href="#" color={ColorsTypes.warning} className="mr-1">
                Warning
              </Badge>
              <Badge href="#" color={ColorsTypes.info} className="mr-1">
                Info
              </Badge>
              <Badge href="#" color={ColorsTypes.light} className="mr-1">
                Light
              </Badge>
              <Badge href="#" color={ColorsTypes.dark} className="mr-1">
                Dark
              </Badge>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default BadgePage;
