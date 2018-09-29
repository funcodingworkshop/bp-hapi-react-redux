import React, { Component } from 'react';
import Type from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class Page404 extends Component {
  static propTypes = {
    classes: Type.shape({})
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={ classes.container }>
        <h2>Page 404</h2>
        <Button variant="outlined" color="primary" className={classes.button}>
          Click Me
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Page404);
