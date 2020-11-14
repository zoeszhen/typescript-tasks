import { Gender, NewPatient } from './types';

const toNewPatientEntry = (object: any): NewPatient => {
    const newEntry: NewPatient = {
        name: parseString(object.name, "name"),
        occupation: parseString(object.occupation, "occupation"),
        ssn: parseString(object.ssn, "ssn"),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender)
    }

    return newEntry;
}

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};
// name, dateOfBirth, gender, occupation,ssn
const parseString = (name: any, type: string): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing ${type}: ${name}`);
    }

    return name;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): string => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

export default toNewPatientEntry;