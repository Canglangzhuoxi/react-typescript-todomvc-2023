interface Props {
  error: Error
}
export const ErrorBoundaryFallbackComponent = ({ error }: Props) => (
  <>
    something error Occurring
    <span role='img' aria-label='face-emoji'>
      😞{error.message}
    </span>
  </>
)
