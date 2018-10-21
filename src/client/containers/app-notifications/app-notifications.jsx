import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import NotificationWrapper from '../../components/notification-wrapper/notification-wrapper';
import { NOTIFICATION_TYPES } from './constants';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class ConsecutiveSnackbars extends React.Component {
  queue = [];

  state = {
    open: false,
    messageInfo: {}
  };

  handleClick = (message, notificationType = NOTIFICATION_TYPES.info) => () => {
    this.queue.push({
      message,
      notificationType,
      key: new Date().getTime()
    });

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const { classes } = this.props;
    const { message, key, notificationType } = this.state.messageInfo;
    return (
      <div>
        <Button onClick={this.handleClick('success message', NOTIFICATION_TYPES.success) }>Show success message</Button>
        <Button onClick={this.handleClick('error message', NOTIFICATION_TYPES.error) }>Show error message</Button>
        <Snackbar
          key={key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        >
          <NotificationWrapper
            onClose={this.handleClose}
            variant={ notificationType }
            message={ message }
          />
        </Snackbar>
      </div>
    );
  }
}

ConsecutiveSnackbars.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConsecutiveSnackbars);
