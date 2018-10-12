import React, { PureComponent } from 'react';
import Type from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import styles from './styles';

class AppMenu extends PureComponent {
  static propTypes = {
    classes: Type.shape({}).isRequired,
    isOpened: Type.bool,
    onClose: Type.func.isRequired,
    mainListItems: Type.node,
    otherListItems: Type.node
  };

  static defaultProps = {
    isOpened: false
  };

  render() {
    const { classes, onClose, mainListItems, otherListItems } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>{mainListItems}</List>
        <Divider />
        <List>{otherListItems}</List>
      </div>
    );

    return (
      <div>
        <Drawer open={ this.props.isOpened } onClose={ onClose }>
          <div
            tabIndex={0}
            role="button"
            onClick={ onClose }
            onKeyDown={ onClose }
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(AppMenu);
