import { motion } from 'framer-motion';
import React from 'react';

interface SwitchProps {
  on: boolean;
  onChange: (on: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ on, onChange }) => {
  return (
    <motion.button
      onClick={() => onChange(!on)}
      className={`flex w-16 h-6 p-1 rounded-3xl bg-white ${
        on ? 'justify-end' : 'justify-start'
      }`}
    >
      <motion.div
        className={`rounded-full h-full w-auto aspect-square ${
          on ? 'bg-green-500' : 'bg-gray-500'
        }`}
        layout
      ></motion.div>
    </motion.button>
  );
};
