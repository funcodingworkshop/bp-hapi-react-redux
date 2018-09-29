import React, { Component } from 'react';
import Type from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class Page405 extends Component {
  static propTypes = {
    classes: Type.shape({})
  };

  render() {
    console.log(this.props);
    const { classes } = this.props;
    return (
      <div className={ classes.container }>
        <h2>Page 405 ... 405 ... 405</h2>
        <Button variant="outlined" color="primary" className={classes.button}>
          Click Me
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Page405);
