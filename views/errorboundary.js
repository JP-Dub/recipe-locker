import React, { Component } from "react";

// Error class React Component
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h3>Um...Something went wrong.</h3>;
    }
    return this.props.children;
  }
}

