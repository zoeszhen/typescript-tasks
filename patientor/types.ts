export interface Diagnoses {
   code: string,
   name: string,
   latin?: string
}
export enum Gender {
   Female = "female",
   Male = "male"
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface

interface BaseEntry {
   id: string;
   description: string;
   date: string;
   specialist: string;
   diagnosisCodes?: Array<Diagnoses['code']>;
}

export enum HealthCheckRating {
   "Healthy" = 0,
   "LowRisk" = 1,
   "HighRisk" = 2,
   "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
   type: "HealthCheck";
   healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
   type: "Hospital";
   discharge: {
      date: string,
      criteria: string
   }
}

interface OccupationalHealthcareEntry extends BaseEntry {
   type: "OccupationalHealthcare";
   employerName: string,
   sickLeave?: {
      startDate: string,
      endDate: string,
   }
}
export type Entry =
   | HospitalEntry
   | OccupationalHealthcareEntry
   | HealthCheckEntry;

export interface Patient {
   id: string,
   name: string,
   dateOfBirth: string,
   ssn: string,
   gender: string,
   occupation: string
   entries: Entry[]
}

export type NewPatient = Omit<Patient, 'id'>
export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>
