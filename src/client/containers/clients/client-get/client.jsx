import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SERVICES } from '../../../../server/config/services';
import axios from '../../../axios-instance-browser';
import { fetchClientsSuccessAC } from '../../../redux/actions/clients-actions';
import { selectClients } from '../../../redux/selectors/clients-selectors';
import { useStyles } from './styles';
import InputField from '../../../components/field-component/field-component';

function mapStateToProps(state) {
  return {
    clientsList: selectClients(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchClients: fetchClientsSuccessAC
    },
    dispatch
  );
}
function Clients(props) {
  const classes = useStyles();

  const callGetClients = async () => {
    const { method, path: url } = SERVICES.clients;
    const { data } = await axios({ method, url });
    props.fetchClients(data);
  };

  useEffect(() => {
    callGetClients();
  }, []);

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.button}>
        Add client
      </Button>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>User id</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Surname</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.clientsList.map(row => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="right">{row.firstName}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <InputField />
    </div>
  );
}
Clients.propTypes = {
  fetchClients: PropTypes.func.isRequired,
  clientsList: PropTypes.array.isRequired
};

const VisibleClients = connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients);

export default VisibleClients;
