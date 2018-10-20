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
        <br/>
        <div>We are announcing a new course <b>Full-Stack Web Developer from scratch</b>.
          Get a well-paid and interesting job of a web-developer in not more than 6 months!
        </div>
        <br/>
        <div>The training group will consist of 10 people.
          The course program is based on the bootcamp experience from Boston, USA.
          You will learn server and client programming languages (Node.js, React).
          At the end of the course a graduate will have enough knowledge to work as a web developer.
        </div>
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
