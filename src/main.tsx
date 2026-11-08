import React, { Component, type ErrorInfo, type ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application rendering failed:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const isAmharic = document.documentElement.lang === 'am'
      return <main className="runtime-error" role="alert">
        <h1>{isAmharic ? 'ገጹን መጫን አልተቻለም።' : 'This page could not be loaded.'}</h1>
        <p>{isAmharic ? 'እባክዎ ገጹን እንደገና ይክፈቱ።' : 'Please reload the page to try again.'}</p>
        <button className="button" onClick={() => window.location.reload()}>{isAmharic ? 'እንደገና ይጫኑ' : 'Reload page'}</button>
      </main>
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <BrowserRouter><App /></BrowserRouter>
    </AppErrorBoundary>
  </React.StrictMode>,
)
