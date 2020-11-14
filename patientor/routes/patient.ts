import express from 'express';
import patientService from '../services/patientService'

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
})

router.get('/:id', (req, res) => {
    console.log("req.body", req.params)
    const { id } = req.params
    const patient = patientService.getEntries().find((patient) => patient.id === id)
    console.log("patient", patient)
    if (patient) {
        res.send(patient);
    } else {
        res.status(400).json("no patient found")
    }
})

router.post('/', (req, res) => {
    const { name, dateOfBirth, gender, occupation, ssn } = req.body;
    const newDiaryEntry = patientService.addPatient({ name, dateOfBirth, gender, occupation, ssn, entries: [] });
    res.json(newDiaryEntry);
})

export default router;