import { Treemap, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const FailureTypeTreeMapChart = ({ data, colors }: { data: any[], colors: string[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <Treemap
        data={data}
        dataKey="cnt"
        nameKey="type"
        stroke="#fff"
        aspectRatio={4 / 3}
      >
        {data.map(( index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
        <Tooltip formatter={(value: number) => `${value} occurrences`} />
      </Treemap>
    </ResponsiveContainer>
  );
}

export default FailureTypeTreeMapChart;
