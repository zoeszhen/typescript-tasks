import express from 'express';
import patientService from '../services/patientService'
import toNewPatientEntry from "../utils"
import toNewEntry from "../entryUtils"

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const patient = patientService.getEntries().find((patient) => patient.id === id)
    if (patient) {
        res.send(patient);
    } else {
        res.status(400).json("no patient found")
    }
})

router.post('/', (req, res) => {
    const { name, dateOfBirth, gender, occupation, ssn } = toNewPatientEntry(req.body);
    const newDiaryEntry = patientService.addPatient({ name, dateOfBirth, gender, occupation, ssn, entries: [] });
    res.json(newDiaryEntry);
})

router.post('/:id/entries', (req, res) => {
    const { id } = req.params;
    const newEntries = toNewEntry(req.body, id);
    if (newEntries) {
        const newDiaryEntry = patientService.addPatientEntry(newEntries);
        res.json(newDiaryEntry);
    } else {
        res.status(400).json("missing parameters")
    }

})

export default router;