import patientData from '../data/patients.json'
import { NonSensitivePatientData } from '../types'

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const addEntry = () => {
    return null;
};

export default {
    getNonSensitiveEntries,
    addEntry
};