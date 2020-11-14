import React, { useEffect } from 'react';
import axios from "axios";
import { Patient, HealthCheckEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom"
import { Header, Icon, List, Button } from "semantic-ui-react";
import EntryDetails from '../components/EntryDetails'
import { PatientEntryValues } from "../AddPatientModal/AddEntryForm";
import AddPatientModal from "../AddPatientModal";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patientsDetail, diagnosis }, dispatch] = useStateValue();

    useEffect(() => {
        if (!Object.keys(patientsDetail).includes(id)) {
            console.log("come")
            const fetchPatientDetail = async () => {
                try {
                    const { data: patientListFromApi } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    dispatch({ type: "SET_PATIENT_DETAIL", payload: patientListFromApi });
                } catch (e) {
                    console.error(e);
                }
            }
            fetchPatientDetail()
        }
    }, [dispatch])
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    if (!(patientsDetail && id)) {
        return <div>no patient data</div>
    }
    const patient = Object.values(patientsDetail).find((patient) => patient.id === id)

    const submitNewPatient = async (values: PatientEntryValues) => {
        try {
            const { data: newPatientEntry } = await axios.post<HealthCheckEntry>(
                `${apiBaseUrl}/patients/${id}/entries `,
                {
                    ...values,
                    type: "HealthCheck",
                }
            );
            if (patient) {
                const newPatient = {
                    ...patient,
                    entries: patient?.entries.concat(newPatientEntry)
                }

                dispatch({ type: "ADD_PATIENT_ENTRY", payload: newPatient });
            }
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };

    return <div>

        {
            patient && <div>
                <div>
                    <Header as="h1">{patient.name}  <Icon name={patient.gender === "female" ? "woman" : "man"}></Icon></Header>

                </div>
                <div>
                    ssn: {patient.ssn}
                </div>
                <div>
                    occupation: {patient.occupation}
                </div>
                <Header as="h2">entries</Header>
                <div>
                    {
                        patient.entries.map((entry) =>
                            <>
                                {/* <div>
                                    {entry.date} {entry.description}
                                </div> */}
                                <EntryDetails entry={entry}></EntryDetails>
                                {/* <List bulleted>
                                    {
                                        diagnosis.length > 0 && entry.diagnosisCodes && entry.diagnosisCodes.map((code) => <List.Item >
                                            {code} {diagnosis.find((detail) => detail.code === code)?.name}
                                        </List.Item>)
                                    }
                                </List> */}
                            </>
                        )
                    }
                </div>
            </div>
        }
        <AddPatientModal
            modalOpen={modalOpen}
            onSubmit={submitNewPatient}
            error={error}
            onClose={closeModal}
            isEntry={true}
        />
        <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>

}


export default PatientPage;