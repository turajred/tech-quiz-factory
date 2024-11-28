import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface Props {
  selectedRoute: number | null;
}

export const MapVisualization = ({ selectedRoute }: Props) => {
  const routes = [
    { 
      path: 'M100,100 L300,300', 
      color: '#22c55e',
      via: [],
      distance: '264 km'
    },
    { 
      path: 'M100,100 L200,180 L300,300', 
      color: '#3b82f6',
      via: ['Comilla'],
      distance: '295 km'
    },
    { 
      path: 'M100,100 L180,160 L240,220 L300,300', 
      color: '#ec4899',
      via: ['Feni', 'Noakhali'],
      distance: '280 km'
    },
  ];

  const cities = [
    { name: 'Dhaka', x: 100, y: 100 },
    { name: 'Chattogram', x: 300, y: 300 },
    { name: 'Comilla', x: 200, y: 180 },
    { name: 'Feni', x: 180, y: 160 },
    { name: 'Noakhali', x: 240, y: 220 },
  ];

  return (
    <div className="map-container relative">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #000 1px, transparent 0),
            linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0),
            linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)
          `,
          backgroundSize: '20px 20px, 40px 40px, 40px 40px',
          backgroundPosition: '0 0, 0 0, 20px 20px'
        }} />
      </div>

      <svg 
        className="w-full h-full relative z-10"
        viewBox="0 0 400 400"
        style={{ background: 'transparent' }}
      >
        {/* Draw Routes */}
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
        
        {/* Draw Cities */}
        {cities.map((city, index) => (
          <motion.g
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <motion.circle
              cx={city.x}
              cy={city.y}
              r="6"
              fill="#18181b"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            />
            <motion.text
              x={city.x + 15}
              y={city.y + 5}
              className="text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 + 0.3 }}
            >
              {city.name}
            </motion.text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
};