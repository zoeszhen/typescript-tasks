import React from "react";
import { useStateValue } from '../state'
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, GenderOption, NumberField } from "./FormField";
import { DiagnosisSelection } from './FormField'
import { HealthCheckEntry, Gender, Patient } from "../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type PatientEntryValues = Omit<HealthCheckEntry, "id" | "type">;

interface Props {
  onSubmit: (values: PatientEntryValues) => void;
  onCancel: () => void;
}
// {
//   id: 'b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da',
//   date: '2019-10-20',
//   specialist: 'MD House',
//   type: 'HealthCheck',
//   description: 'Yearly control visit. Cholesterol levels back to normal.',
//   healthCheckRating: 0,
// },
const genderOptions: GenderOption[] = [
  { value: Gender.Male, label: "Male" },
  { value: Gender.Female, label: "Female" },
  { value: Gender.Other, label: "Other" }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue()
  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        description: "",
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="HealthCheckRating"
              placeholder="HealthCheckRating"
              name="healthCheckRating"
              component={NumberField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
