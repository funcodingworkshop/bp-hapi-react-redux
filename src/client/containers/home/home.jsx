import React from 'react';
import Type from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { selectSay } from '../../redux/selectors/app-selectors';
import { SITE_TITLE } from '../../constants/names';
import logoImg from './img/logo.png';

import styles from './styles';

function mapStateToProps(state) {
  return {
    say: selectSay(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

class Home extends React.Component {
  static propTypes = {
    classes: Type.object.isRequired
  };

  static defaultProps = {
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={ classes.home }>
        <h1>{SITE_TITLE}</h1>
        <div>Just 3 seconds and your message is delivered to your customer!</div>
        <div className={ classes.imgContainer }>
          <img className={ classes.img } src={ logoImg } alt='Coding Bootcamp Ru' />
        </div>
      </div>
    );
  }
}

const WithStylesHome = withStyles(styles)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(WithStylesHome);
