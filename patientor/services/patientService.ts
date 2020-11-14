import patientData from '../data/patients.json'
import { NonSensitivePatientData, NewPatient, Patient } from '../types'
// Load Chance
const Chance = require('chance');

// Instantiate Chance so it can be used
const chance = new Chance();

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const addPatient = (newPatient: NewPatient): Patient => {
    const newPatientEntry = {
        id: chance.guid,
        ...newPatient
    };

    patientData.push(newPatientEntry);
    return newPatientEntry;
}
export default {
    getNonSensitiveEntries,
    addPatient
};