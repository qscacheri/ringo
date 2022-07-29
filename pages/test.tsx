import React, { useEffect } from 'react';
import { Meter, Oscillator, start } from 'tone';

interface TestProps {}

export const Test: React.FC<TestProps> = ({}) => {
  useEffect(() => {}, []);
  return (
    <div
      className="w-screen h-screen bg-blue-500"
      onClick={() => {
        const osc = new Oscillator().start();
        const meter = new Meter();
        osc.connect(meter);
        start();

        setInterval(() => console.log(meter.getValue()), 100);
      }}
    ></div>
  );
};

export default Test;
