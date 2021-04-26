import React from 'react';
import { useRoutes } from 'hookrouter';
import Login  from './components/Login';
import Dashboard  from './components/Dashboard';

const routers = {
    '/': () => <Login />,
    '/Dashboard': () => <Dashboard />,
}

function App() {
    const match = useRoutes(routers)
    return (
        <div>
            {match}
        </div>
    )
}

export default App;