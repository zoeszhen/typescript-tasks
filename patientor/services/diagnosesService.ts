import diagnosesData from '../data/diagnoses.json'
import { Diagnoses } from '../types'

const diagnosesList : Array<Diagnoses> = diagnosesData;

const getEntries = (): Array<Diagnoses> => {
  return diagnosesList;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};