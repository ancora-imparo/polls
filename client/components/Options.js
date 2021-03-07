import React from 'react';
import { Formik, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import IconButton from '@material-ui/core/IconButton';
import { Button, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';

import PropTypes from 'prop-types';

const Options = (props) => {
  const { options, setOptions } = props;

  return (
    <Formik
      initialValues={{ options: options }}
      validationSchema={Yup.object().shape({
        options: Yup.array().of(
          Yup.string().required('Option cannot be empty')
        ),
      })}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        dirty,
        isValid,
      }) => (
        <Form onSubmit={setOptions(values.options)}>
          <FieldArray
            name="options"
            render={(arrayHelpers) => (
              <div>
                {values.options && values.options.length > 0 ? (
                  values.options.map((opt, index) => (
                    <div key={index}>
                      <TextField
                        id="option"
                        name={`options.${index}`}
                        value={opt}
                        label="Enter the option"
                        variant="outlined"
                        error={
                          errors &&
                          errors.options &&
                          errors.options[index] &&
                          touched.options &&
                          touched.options[index]
                            ? true
                            : false
                        }
                        helperText={
                          errors &&
                          errors.options &&
                          errors.options[index] &&
                          touched.options &&
                          touched.options[index]
                            ? errors.options[index]
                            : ''
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        style={{ width: '45%' }}
                      />
                      <IconButton aria-label="delete">
                        <DeleteIcon
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        />
                      </IconButton>

                      <Fab color="primary" aria-label="add">
                        <AddIcon
                          onClick={() => arrayHelpers.insert(index + 1, '')}
                        />
                      </Fab>
                    </div>
                  ))
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    type="button"
                    onClick={() => arrayHelpers.push('')}
                  >
                    Add a option
                  </Button>
                )}
              </div>
            )}
          />
        </Form>
      )}
    </Formik>
  );
};
Options.propTypes = {
  options: PropTypes.array,
};
export default Options;
