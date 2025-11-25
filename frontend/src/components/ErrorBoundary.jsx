import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-2">Ha ocurrido un error</h2>
            <p className="text-sm text-gray-700 mb-4">Se detectó un error al renderizar la aplicación. Revisa la consola del navegador para más detalles.</p>
            <details className="text-xs text-gray-600 whitespace-pre-wrap">
              {String(this.state.error)}
            </details>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={() => window.location.reload()}
              >
                Recargar
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
