import React, { useEffect, useState } from 'react';

function DamageBarGraph({ data }) {
  const [damageObj, setDamageObj] = useState(null);
  const [datasu, setDatasu] = useState(null);
  const [tooltip, setTooltip] = useState(null); // Tooltip content

  useEffect(() => {
    setDamageObj(data);
    if (damageObj != null) {
      console.log("damageObj loaded:", damageObj);
    }
  }, [data]);

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
      setDatasu(updatedData);
    }
  }, [data?.damageInstances]);

  // Calculate total damage for percentage width
  const totalDamage = damageObj?.totalDamage || 0;

  // Function to get color based on type
  const getTypeColor = (type) => {
    switch (type) {
      case 'Burst': return '#FF5733'; // Red
      case 'E': return '#33C1FF'; // Blue
      default: return '#8884d8'; // Default color
    }
  };

  // Show tooltip on hover
  const handleMouseEnter = (e, instance) => {
    setTooltip({
      name: instance.name,
      type: instance.type,
      damageValue: instance.damageValueInstance,
    });
  };

  // Hide tooltip on mouse leave
  const handleMouseLeave = () => {
    setTooltip(null); // Hide tooltip
  };

  return (
    <div className="text-white w-full flex mt-5 flex-col items-start">
      {/* Stacked Bar Graph with Tooltip */}
      {datasu && (
        <div className="w-full flex items-center justify-start space-x-2 relative">
          {datasu.map((instance, index) => {
            const percentageWidth = totalDamage === 0 ? 0 : (instance.damageValueInstance / totalDamage) * 100;

            return (
              <div
                key={index}
                className="relative flex items-center justify-center"
                style={{
                  height: '30px',
                  width: `${percentageWidth}%`,
                  backgroundColor: getTypeColor(instance.type),
                  position: 'relative',
                  marginRight: '2px',
                }}
                onMouseEnter={(e) => handleMouseEnter(e, instance)} // Show tooltip on hover
                onMouseLeave={handleMouseLeave} // Hide tooltip on mouse leave
              >
                <span
                  className="absolute text-xs text-white font-semibold"
                  style={{
                    transform: 'translateX(-50%)',
                    left: '50%',
                  }}
                >
                  {instance.type}
                </span>
              </div>
            );
          })}

          {/* Tooltip */}
          {tooltip && (
            <div
              className="absolute p-2 top-20 bg-gray-800 text-white text-sm rounded shadow-md z-100"
            >
              <div><strong>Name:</strong> {tooltip.name}</div>
              <div><strong>Type:</strong> {tooltip.type}</div>
              <div><strong>Damage:</strong> {tooltip.damageValue.toFixed(2)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DamageBarGraph;
