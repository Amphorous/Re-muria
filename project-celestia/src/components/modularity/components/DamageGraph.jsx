import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';
import CustomTooltip from './CustomTooltip';

function DamageGraph({ data }) {
  const [datasu, setDatasu] = useState(null);
  const [ticks, setTicks] = useState([]);

  // Function to make both duration and damage cumulative
  function makeDurationCumulative(arr) {
    let cumulativeDuration = 0;
    let cumulativeDamage = 0;

    return arr.map(item => {
      cumulativeDuration += item.duration;
      cumulativeDamage += item.damageValue;

      return {
        ...item,
        duration: cumulativeDuration,
        damageValueInstance: item.damageValue,
        damageValue: cumulativeDamage
      };
    });
  }

  // When data changes, calculate cumulative values
  useEffect(() => {
    if (data?.damageInstances) {
      const updatedData = makeDurationCumulative(data.damageInstances);
      console.log("pre datasu update: ", updatedData)
      setDatasu(updatedData);

      // Calculate tick marks at every 1000ms
      const maxDuration = Math.max(...updatedData.map(d => d.duration));
      const generatedTicks = Array.from(
        { length: Math.ceil(maxDuration / 1000) + 1 },
        (_, i) => i * 1000
      );

      console.log("generated ticks", generatedTicks)
      setTicks(generatedTicks);
    }
  }, [data?.damageInstances]);

  const addOriginPoint = (dataArray) => {
    if (!dataArray || dataArray.length === 0) return [];
    return [{ ...dataArray[0], duration: 0, damageValue: 0 }, ...dataArray];
  };

  return (
    <div className='text-white w-full flex mt-5'>
      {(datasu && ticks.length > 0) && (
        <ResponsiveContainer width="100%" height={300}>
        <AreaChart
        data={addOriginPoint(datasu)}
        margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
        >

            <defs>
              <linearGradient id="colorDamage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
            dataKey="duration"
            type="number"
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}s`}
            tick={{ fill: '#ccc', fontFamily: "Afacad" }}
            >
            <Label
                value="Time"
                position="bottom"
                offset={0}
                style={{ fill: '#ccc', fontFamily: 'Afacad' }}
            />
            </XAxis>


            <YAxis
            tickFormatter={(value) => `${(value / 1000).toFixed()}k`}
            tick={{
                fill: '#ccc',
                fontFamily: "Afacad"
            }}
            >
            <Label
                value="Damage"
                angle={-90}
                position="insideLeft"
                style={{ fill: '#ccc', fontFamily: 'Afacad' }}
            />
            </YAxis>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="damageValue"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorDamage)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default DamageGraph;