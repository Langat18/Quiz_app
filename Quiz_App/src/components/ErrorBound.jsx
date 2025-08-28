import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err, info) {
    console.error("Boundary caught:", err, info);
  }
  render() {
    if (this.state.hasError) return <h2>We are sorry, Something Broke. Try Refreshing the page.</h2>;
    return this.props.children;
  }
}