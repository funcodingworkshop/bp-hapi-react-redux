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
        <h1>JavaScript Developer from Zero to Hero</h1>
        <div className={ classes.imgContainer }>
          <img className={ classes.img } src={ logoImg } alt='Coding Bootcamp Ru' />
        </div>
        <div>Learn web-development, Node.js, React in 6 months with { SITE_TITLE }</div>
      </div>
    );
  }
}

const WithStylesHome = withStyles(styles)(Home);

const VisibleHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithStylesHome);

export default VisibleHome;
