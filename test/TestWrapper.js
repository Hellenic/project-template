import PropTypes from "prop-types";
import React from "react";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import identityProxy from "identity-obj-proxy";
import theme from "../src/theme";

// Stub for global Window objects
window.matchMedia = () => ({ matches: true });

const TestWrapper = (props) => {
  return (
    <IntlProvider locale="en" messages={identityProxy}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </MemoryRouter>
    </IntlProvider>
  );
};

TestWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TestWrapper;
