import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddPatientForm, { PatientFormValues } from './AddPatientForm';
import AddEntryForm, { PatientEntryValues } from './AddEntryForm';


interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  error?: string;
  isEntry?: boolean
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error, isEntry = false }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {!isEntry && <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />}
      {isEntry && <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />}
    </Modal.Content>
  </Modal>
);

export default AddPatientModal;
