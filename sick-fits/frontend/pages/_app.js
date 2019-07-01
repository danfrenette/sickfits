import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // This exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  } // This is a special Next.js life cycle method that runs before render,
    // allowing us to expose the pageProps variable below.

  render () {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={ apollo }>
          <Page>
            <Component {...pageProps}/>
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp);
