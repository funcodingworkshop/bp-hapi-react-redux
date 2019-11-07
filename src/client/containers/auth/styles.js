export default function styles(theme) {
  return {
    container: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
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
