import { Component } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <p style={{ padding: 24, textAlign: "center" }}>
            Упс! Что‑то пошло не так 😢
          </p>
        )
      );
    }
    return this.props.children;
  }
}
