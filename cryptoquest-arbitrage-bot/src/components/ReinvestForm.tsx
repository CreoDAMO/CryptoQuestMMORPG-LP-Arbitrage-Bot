import React, { useState } from 'react';

const ReinvestForm: React.FC = () => {
    const [profits, setProfits] = useState<number>(0);
    const [reinvestPercentage, setReinvestPercentage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('/api/reinvestProfits', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profits, reinvestPercentage }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess('Reinvestment successful!');
            } else {
                setError(`Error: ${data.error}`);
            }
        } catch (error) {
            setError(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Profits:
                <input type="number" value={profits} onChange={(e) => setProfits(Number(e.target.value))} />
            </label>
            <label>
                Reinvest Percentage:
                <input type="number" value={reinvestPercentage} onChange={(e) => setReinvestPercentage(Number(e.target.value))} />
            </label>
            <button type="submit" disabled={loading}>Reinvest</button>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
};

export default ReinvestForm;
