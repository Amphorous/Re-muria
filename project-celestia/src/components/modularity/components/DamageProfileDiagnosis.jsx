import React, { useEffect, useState } from 'react';

const DamageProfileDiagnosis = ({ data }) => {
  const [diagnosis, setDiagnosis] = useState('');

  useEffect(() => {
    const instances = data?.damageInstances;
    const totalDamage = data?.totalDamage;

    if (!instances || instances.length === 0 || !totalDamage) {
      setDiagnosis('No damage data available.');
      return;
    }

    // Step 1: Get duration of last item
    const lastDuration = instances[instances.length - 1].duration;

    // Step 2: Midpoint in time
    const midpoint = lastDuration / 2;

    // Step 3: Sum damage in each half
    let firstHalfDamage = 0;
    let secondHalfDamage = 0;

    for (const instance of instances) {
      if (instance.duration <= midpoint) {
        firstHalfDamage += instance.damageValue;
      } else {
        secondHalfDamage += instance.damageValue;
      }
    }

    // Step 4: Margin of comfort — 10% of total damage
    const margin = totalDamage * 0.20;
    const diff = Math.abs(firstHalfDamage - secondHalfDamage);

    // Step 5: Classification
    if (diff <= margin) {
      setDiagnosis('Uniform');
    } else if (firstHalfDamage > secondHalfDamage) {
      setDiagnosis('Frontloaded');
    } else {
      setDiagnosis('Rearloaded');
    }
  }, [data]);

  return (
    <div>
      <strong>Damage Profile:</strong> {diagnosis}
    </div>
  );
};

export default DamageProfileDiagnosis;
