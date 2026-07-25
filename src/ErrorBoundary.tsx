import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type State = {
  error: Error | null
}

// React only supports error boundaries as class components — there's no
// hook equivalent. Without this, a render-phase exception anywhere in the
// gameplay tree unmounts to a blank white screen with no way back except
// reloading, which reads exactly like "the game randomly froze": no error
// shown, no input works, nothing to click. This at least gives the player
// a way out and logs what happened instead of failing silently.
class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Orbit] render error', error, info.componentStack)
  }

  override render() {
    if (this.state.error) {
      return (
        <div className="screen error-screen">
          <h1>Something went wrong</h1>
          <p className="setting-hint">
            The game hit an unexpected error and couldn't continue safely.
          </p>
          <button
            type="button"
            className="screen-button"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
