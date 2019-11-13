import React from 'react';
import TextField from '@material-ui/core/TextField';
import useStylesReddit from './styles';

export default function InputField() {
  const classes = useStylesReddit();

  return (
    <TextField InputProps={{ classes, disableUnderline: true }}
      label="Reddit"
      variant="filled"
      id="reddit-input" />
  );
}