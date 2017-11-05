import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import 'typeface-quicksand';
import './reset.css';
import './index.css';

const Header = () => (
  <nav className="navbar">
    <Link to="/" className="link link__nav">
      Pomodoro Timer
    </Link>
  </nav>
);

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Pomodoro Timer"
      meta={[
        { name: 'description', content: 'Pomodoro Timer' },
        { name: 'keywords', content: 'pomodoro, kanban' }
      ]}
      link={[{ rel: 'icon', href: '/static/tomato.png' }]}
    />
    <Header />
    <div>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
