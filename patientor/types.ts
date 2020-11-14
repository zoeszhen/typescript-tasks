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
export interface Entry {
}


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
