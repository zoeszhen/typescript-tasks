import React, { useEffect } from 'react';
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom"
import { Header, Icon, List } from "semantic-ui-react";
import EntryDetails from '../components/EntryDetails'
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

    if (!(patientsDetail && id)) {
        return <div>no patient data</div>
    }
    const patient = Object.values(patientsDetail).find((patient) => patient.id === id)
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
    </div>

}


export default PatientPage;