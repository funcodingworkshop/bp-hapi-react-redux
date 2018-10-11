import React, { Component } from 'react';
import Type from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class ButtonDefault extends Component {
  static propTypes = {
    classes: Type.shape({}),
    name: Type.string.isRequired,
    onClick: Type.func
  };

  static defaultProps = {
    onClick: () => {}
  };

  render() {
    const { classes, onClick, name } = this.props;
    return (
      <div className={ classes.container }>
        <Button variant="outlined" color="primary" className={classes.button} onClick={ onClick }>
          { name }
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ButtonDefault);
