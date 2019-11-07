import React, { PureComponent } from 'react';
import Type from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import NotificationWrapper from '../../components/notification-wrapper/notification-wrapper';
import { selectSay, selectCurrentNotification, selectIsNotificationOpen } from '../../redux/selectors/app-selectors';
import {
  enqueueErrorNotificationSagaAC,
  enqueueSuccessNotificationSagaAC,
  closeNotificationAC,
  processNotificationAC
} from '../../redux/actions/app-actions';

const styles = theme => ({
  close: {
    padding:  theme.spacing(1)
  }
});

function mapStateToProps(state) {
  return {
    say: selectSay(state),
    currentNotification: selectCurrentNotification(state),
    isNotificationOpen: selectIsNotificationOpen(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enqueueErrorNotification: enqueueErrorNotificationSagaAC,
    enqueueSuccessNotification: enqueueSuccessNotificationSagaAC,
    closeNotification: closeNotificationAC,
    processNotification: processNotificationAC
  }, dispatch);
}

class AppNotifications extends PureComponent {
  static propTypes = {
    classes: Type.object.isRequired,
    currentNotification: Type.shape({
      notificationType: Type.string,
      message: Type.string,
      key: Type.number
    }),
    enqueueErrorNotification: Type.func,
    enqueueSuccessNotification: Type.func,
    closeNotification: Type.func,
    processNotification: Type.func,
    isNotificationOpen: Type.bool
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.closeNotification();
  };

  handleExited = () => {
    this.props.processNotification();
  };

  render() {
    const { classes } = this.props;
    const {
      currentNotification: { message, key, notificationType },
      isNotificationOpen
    } = this.props;
    return (
      <div>
        <Snackbar
          key={key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={ isNotificationOpen }
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

const WithStylesAppNotifications = withStyles(styles)(AppNotifications);
export default connect(mapStateToProps, mapDispatchToProps)(WithStylesAppNotifications);
