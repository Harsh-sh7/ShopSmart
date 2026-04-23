import { useState, useEffect } from 'react'

// Dummy product data
const PRODUCTS = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, icon: '🎧' },
    { id: 2, name: 'Smart Watch', price: 149.00, icon: '⌚' },
    { id: 3, name: 'Laptop Backpack', price: 45.50, icon: '🎒' },
    { id: 4, name: 'Mechanical Keyboard', price: 120.00, icon: '⌨️' },
    { id: 5, name: 'Gaming Mouse', price: 59.99, icon: '🖱️' },
    { id: 6, name: 'Bluetooth Speaker', price: 79.99, icon: '🔊' },
];

function App() {
    const [data, setData] = useState(null);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        fetch(`${apiUrl}/api/health`)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => {
                console.error('Error fetching health check:', err);
                // Fallback for UI if missing backend
                setData({ status: 'error', message: 'Backend is offline' });
            });
    }, []);

    const addToCart = () => {
        setCartCount(prev => prev + 1);
    };

    return (
        <div className="app-container">
            {/* Added missing Header */}
            <header className="header">
                <h1>🛍️ ShopSmart</h1>
                <button className="cart-button">
                    🛒 Cart ({cartCount})
                </button>
            </header>

            <main className="main-content">
                {/* User's Original Code */}
                <div className="container">
                    <h1>ShopSmart (Legacy View)</h1>
                    <div className="card">
                        <h2>Backend Status</h2>
                        {data ? (
                            <div>
                                <p>Status: <span className="status-ok">{data.status}</span></p>
                                <p>Message: {data.message}</p>
                                <p>Timestamp: {data.timestamp || 'N/A'}</p>
                            </div>
                        ) : (
                            <p>Loading backend status...</p>
                        )}
                    </div>
                    <p className="hint">
                        Edit <code>src/App.jsx</code> and save to test HMR
                    </p>
                </div>

                {/* Added missing Products Grid */}
                <div style={{marginTop: '2rem'}}>
                    <h2>Featured Products</h2>
                    <div className="products-grid">
                        {PRODUCTS.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-image">
                                    {product.icon}
                                </div>
                                <div className="product-info">
                                    <h3 className="product-title">{product.name}</h3>
                                    <div className="product-price">${product.price.toFixed(2)}</div>
                                    <button className="add-to-cart-btn" onClick={addToCart}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Added missing Footer */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} ShopSmart Inc.</p>
                <div className={`status-badge ${data?.status === 'ok' ? 'status-online' : 'status-offline'}`}>
                    <div className={`status-dot ${data?.status === 'ok' ? 'online' : 'offline'}`}></div>
                    {data?.status === 'ok' ? 'API Online' : 'API Offline'}
                </div>
            </footer>
        </div>
    )
}

export default App
