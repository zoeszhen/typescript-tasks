import React from 'react';
import { Header, Icon, Divider, Card } from 'semantic-ui-react';
import { Entry } from '../types'

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const HealthCheckCmp: React.FC<{ entry: Entry }> = ({ entry }) =>
    <Card fluid>
        <Card.Content>
            <Header as="h2">{entry.date} <Icon name="doctor"></Icon></Header>
            <p>{entry.description}</p>
            <Icon name="heart" color="green"></Icon>
        </Card.Content>
    </Card>

const HospitalCmp: React.FC<{ entry: Entry }> = ({ entry }) =>
    <Card fluid>
        <Card.Content>
            <Header as="h2">{entry.date} <Icon name="medkit"></Icon></Header>
            <p>{entry.description}</p>
            <Icon name="heart" color="yellow"></Icon>
        </Card.Content>
    </Card>

const OccupationalHealthcareCmp: React.FC<{ entry: Entry }> = ({ entry }) =>
    <Card fluid>
        <Card.Content>
            <Header as="h2">{entry.date} <Icon name="frown outline"></Icon></Header>
            <p>{entry.description}</p>
            <Icon name="heart" color="red"></Icon>
        </Card.Content>
    </Card>

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheckCmp entry={entry}></HealthCheckCmp>
        case "Hospital":
            return <HospitalCmp entry={entry}></HospitalCmp>
        case "OccupationalHealthcare":
            return <OccupationalHealthcareCmp entry={entry}></OccupationalHealthcareCmp>
        default:
            return assertNever(entry)
    }

}

export default EntryDetails;