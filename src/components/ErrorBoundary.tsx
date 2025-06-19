import { Component } from "react";
import type { ReactNode } from "react";

interface Props {
  /** Что рендерить, если всё хорошо */
  children: ReactNode;
  /** Что показать, когда случилась ошибка */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Класс‑обёртка: ловит ошибки всех потомков в runtime
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    /* Можно логировать в Sentry / console */
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
