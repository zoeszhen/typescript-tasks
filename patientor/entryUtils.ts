import { HealthCheckRating, BaseEntry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from './types';

const toNewEntry = (object: any, id: string): HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry | undefined => {
    console.log("object.description", object)
    const baseEntry: BaseEntry = {
        id: id,
        description: parseString(object.description, "description"),
        specialist: parseString(object.specialist, "specialist"),
        date: parseDate(object.date),
        diagnosisCodes: object.diagnosisCodes
    }
    switch (object.type) {
        case "HealthCheck":
            return {
                ...baseEntry,
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            }
        case "Hospital":
            return {
                ...baseEntry,
                type: "Hospital",
                discharge: {
                    date: parseDate(object.discharge.date),
                    criteria: parseString(object.discharge.criteria, "criteria"),
                }
            }
        case "OccupationalHealthcare":
            return {
                ...baseEntry,
                type: "OccupationalHealthcare",
                employerName: parseString(object.employerName, "name"),
                sickLeave: object.sickLeave ? {
                    startDate: parseDate(object.dateOfBirth),
                    endDate: parseDate(object.dateOfBirth),
                } : undefined
            }
        default:
            return undefined
    }

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

const isGender = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rate: any): number => {
    if (!rate || !isGender(rate)) {
        throw new Error('Incorrect or missing gender: ' + rate);
    }
    return rate;
};

export default toNewEntry;