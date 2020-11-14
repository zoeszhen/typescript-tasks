import patientData from '../data/patients'
import { NonSensitivePatientData, NewPatient, Patient } from '../types'
// Load Chance
const Chance = require('chance');

// Instantiate Chance so it can be used
const chance = new Chance();

const patients: Array<Patient> = patientData as Array<Patient>;
const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const getEntries = (): NonSensitivePatientData[] => {
    return patients
};

const addPatient = (newPatient: NewPatient): Patient => {
    const newPatientEntry = {
        id: chance.guid,
        ...newPatient
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
}
export default {
    getNonSensitiveEntries,
    addPatient,
    getEntries
};