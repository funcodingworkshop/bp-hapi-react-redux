export default function (theme) {
  return {
    container: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },
    form: {
      flexDirection: 'column'
    },
    textField: {
      display: 'flex',
      maxWidth: 400
    },
    buttonBlock: {
      display: 'flex',
      paddingTop: 20,
      maxWidth: 400,
      width: '100%'
    },
    button: {
      margin: 'auto',
      width: 400
    }
  };
}
