import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis
} from 'recharts';

export default function Chart({ title, data, dataKey, gird }) {
    return (
        <div className="chart">
            <h3 className="chart__title">{title}</h3>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#5550bd" />
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                    <Tooltip />
                    {gird && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
