import useRouteElement from 'hooks/useRouteElement'

function App() {
  const route = useRouteElement()
  return <>{route}</>
}

export default App
