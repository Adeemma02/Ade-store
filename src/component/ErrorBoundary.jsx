import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full px-4 py-6 text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Something went wrong
          </h2>
          <p className="text-gray-600 mt-2">
            Please try again or return to the homepage.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700"
          >
            Go to Homepage
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
