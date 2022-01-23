import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Header from "./components/Header/Header";
import ErrorBoundary from "./containers/ErrorBoundary/ErrorBoundary";
import config from "./config";

class App extends Component {
  static propTypes = {
    isFrontpage: PropTypes.bool,
    localeCode: PropTypes.string,
    appData: PropTypes.object,
    children: PropTypes.any,
  };
  static defaultProps = {
    appData: {},
  };

  render() {
    const { isFrontpage, localeCode, appData } = this.props;

    let onFrontpage = isFrontpage;
    // isFrontpage will be passed on server-side, but won't be on client-side
    // So use the prop or determine new value when component is re-rendered
    if (typeof isFrontpage === "undefined" && !!window) {
      onFrontpage =
        isFrontpage || window.location.pathname === `/${localeCode}/`;
    }
    const localeConfig = config[localeCode];

    return (
      <div className={onFrontpage ? "frontpage" : ""}>
        <Helmet {...localeConfig.head} />
        <Header />
        <pre>Application data: {JSON.stringify(appData)}</pre>
        <ErrorBoundary>{this.props.children}</ErrorBoundary>
        <h2>INSERT FOOTER HERE</h2>
      </div>
    );
  }
}

export default App;
