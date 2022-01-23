import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import Helmet from "react-helmet";
import fetch from "node-fetch";
import config from "../config";

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    try {
      const response = await fetch(`${config.app.apiHost}/posts/1`);
      const post = await response.json();
      return { post };
    } catch (err) {
      console.error("Error while fetching example post", err);
      return { err };
    }
  }

  render() {
    const { post = {}, err = {} } = this.props;
    return (
      <div>
        <Helmet title="Home" />
        <h1>
          <FormattedMessage id="page.home" defaultMessage="Homepage" />
        </h1>
        <p>
          Below is a blog post which was loaded server-side and rendered here.
          This should be visible even if you disable JavaScript.
        </p>
        <hr />
        <h5>{post.title}</h5>
        <p>{post.body}</p>
        <pre>Errors: {JSON.stringify(err)}</pre>
        <hr />
      </div>
    );
  }
}

export default Home;
