import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface Props {
  selectedRoute: number | null;
}

export const MapVisualization = ({ selectedRoute }: Props) => {
  const routes = [
    { path: 'M100,100 L300,300', color: '#22c55e' },
    { path: 'M100,100 L200,200 L300,300', color: '#3b82f6' },
    { path: 'M100,100 L150,250 L300,300', color: '#ec4899' },
  ];

  return (
    <div className="map-container">
      <svg 
        className="w-full h-full"
        viewBox="0 0 400 400"
        style={{ background: '#f8fafc' }}
      >
        {routes.map((route, index) => (
          <motion.path
            key={index}
            d={route.path}
            stroke={route.color}
            strokeWidth={selectedRoute === index ? 4 : 2}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: selectedRoute === null || selectedRoute === index ? 1 : 0.2
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ))}
        
        {/* Dhaka Node */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <circle cx="100" cy="100" r="8" fill="#18181b" />
          <text x="120" y="100" className="text-sm font-medium">
            Dhaka
          </text>
        </motion.g>

        {/* Chattogram Node */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <circle cx="300" cy="300" r="8" fill="#18181b" />
          <text x="320" y="300" className="text-sm font-medium">
            Chattogram
          </text>
        </motion.g>
      </svg>
    </div>
  );
};