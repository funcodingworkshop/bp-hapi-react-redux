import { makeStyles } from '@material-ui/core/styles';

export let useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  },
  button: {
    margin: theme.spacing(1),
    marginTop: 30
  }
}));
