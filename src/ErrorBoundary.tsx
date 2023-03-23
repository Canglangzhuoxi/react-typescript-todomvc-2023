import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}
interface State {
  error: Error | null
  info: ErrorInfo | null
}
class ErrorBoundary extends Component<Props, State> {
  state = {
    error: null,
    info: null,
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({ error, info })
  }

  render(): ReactNode {
    const { error } = this.state
    if (error) {
      return <ErrorBoundaryFallbackComponent />
    }
    return this.props.children
  }
}

export default ErrorBoundary

const ErrorBoundaryFallbackComponent = () => (
  <>
    something error Ooccuring
    <span role='img' aria-label='face-emoji'>
      😞
    </span>
  </>
)
