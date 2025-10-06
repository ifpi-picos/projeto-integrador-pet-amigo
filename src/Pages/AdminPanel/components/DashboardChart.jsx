import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function DashboardChart({ title, tableName, dateColumn }) {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [timeRange, setTimeRange] = useState('7 days'); // Padrão: 7 dias

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.rpc('get_time_series_data', {
                p_table_name: tableName,
                p_time_range: timeRange,
                p_date_column: dateColumn
            });
            
            if (error) {
                console.error(`Erro ao buscar dados para ${tableName}:`, error);
                return;
            }

            const labels = data.map(item => new Date(item.date_series).toLocaleDateString());
            const values = data.map(item => item.count);

            setChartData({
                labels,
                datasets: [{
                    label: `Registros por Dia`,
                    data: values,
                    borderColor: '#26cc6b',
                    backgroundColor: 'rgba(38, 204, 107, 0.2)',
                    fill: true,
                }],
            });
        };

        fetchData();
    }, [tableName, timeRange]);

    return (
        <div className="chart-container">
            <h3>{title}</h3>
            <div className="chart-filters">
                <button onClick={() => setTimeRange('7 days')}>1S</button>
                <button onClick={() => setTimeRange('1 month')}>1M</button>
                <button onClick={() => setTimeRange('1 year')}>1A</button>
            </div>
            <Line data={chartData} />
        </div>
    );
}

export default DashboardChart;