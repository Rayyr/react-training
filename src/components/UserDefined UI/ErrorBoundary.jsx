import React from "react";
import NotFoundError from "../../pages/404NotFound";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "", errorInfo: "" };
  }

  static getDerivedStateFromError(error) {
     return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
 
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
 
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
