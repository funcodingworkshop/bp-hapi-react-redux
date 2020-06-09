import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/core';
import ContactForm from '../../components/contact-form/contact-form';

import styles from './styles';

const propsToValues = ({
  firstName,
  lastName,
  email,
  course,
  password,
  confirmPassword
}) => ({
  firstName: firstName || '',
  lastName: lastName || '',
  email: email || '',
  course: course || '',
  password: password || '',
  confirmPassword: confirmPassword || ''
});

const schema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  course: Yup.string().required('Select your course category'),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match')
});

const submit = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2)); // eslint-disable-line
    setSubmitting(false);
  }, 1000);
};

const Form = withFormik({
  mapPropsToValues: propsToValues,
  validationSchema: schema,
  handleSubmit: submit
})(ContactForm);

export default withStyles(styles)(Form);
