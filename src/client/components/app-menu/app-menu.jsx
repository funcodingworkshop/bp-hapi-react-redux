import React, { PureComponent } from 'react';
import Type from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListItem from '@material-ui/core/ListItem/ListItem';
import styles from './styles';

const listItem = Type.shape({
  iconComponent: Type.func.isRequired,
  onClick: Type.func.isRequired,
  text: Type.string.isRequired
});

class AppMenu extends PureComponent {
  static propTypes = {
    classes: Type.shape({}).isRequired,
    isOpened: Type.bool,
    onClose: Type.func.isRequired,
    mainListItems: Type.arrayOf(listItem),
    otherListItems: Type.arrayOf(listItem)
  };

  static defaultProps = {
    isOpened: false
  };

  render() {
    const { classes, onClose, mainListItems, otherListItems } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          { mainListItems.map(el => (
            <ListItem button onClick={ el.onClick } key={ el.text }>
              <ListItemIcon>
                <el.iconComponent/>
              </ListItemIcon>
              <ListItemText primary={ el.text } />
            </ListItem>
          )) }
        </List>
        <Divider />
        <List>
          { otherListItems.map(el => (
            <ListItem button onClick={ el.onClick } key={ el.text }>
              <ListItemIcon>
                <el.iconComponent/>
              </ListItemIcon>
              <ListItemText primary={ el.text } />
            </ListItem>
          )) }
        </List>
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
