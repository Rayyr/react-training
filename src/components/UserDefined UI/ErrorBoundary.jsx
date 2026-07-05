import React, { Suspense } from "react";
import NotFoundError from "../../pages/404NotFound";

export default class ErrorBoundary extends React.Component {
  state = {
    error: "",
    errorInfo: "",
    haserror: false,
  };
  constructor(props) {
    super(props);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service

    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI

      return (
        <>
          <NotFoundError
            title={
              "Something went wrong! " +
              this.state.error +
              "\n" +
              this.state.errorInfo
            }
          />
        </>
      );
    }

    return this.props.children;
  }
}
