import React from "react";

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error, info) {
        console.error("Caught by ErrorBoundary:", error, info);
    }

    render() {
        if (this.state.error) {
            return (
                <pre style={{
                    padding: 20,
                    color: "red",
                    whiteSpace: "pre-wrap",
                    fontSize: 14
                }}>
                    {this.state.error.toString()}
                    {"\n\n"}
                    {this.state.error.stack}
                </pre>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
