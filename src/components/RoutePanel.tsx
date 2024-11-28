import { motion } from 'framer-motion';
import { Clock, DollarSign, MapPin } from 'lucide-react';

interface Props {
  onRouteSelect: (index: number) => void;
  selectedRoute: number | null;
}

export const RoutePanel = ({ onRouteSelect, selectedRoute }: Props) => {
  const routes = [
    {
      name: 'Direct Route',
      distance: '264 km',
      time: '6h 30m',
      cost: '৳800',
      description: 'Direct highway route via N1',
    },
    {
      name: 'Scenic Route',
      distance: '295 km',
      time: '7h 45m',
      cost: '৳950',
      description: 'Scenic route via Comilla',
    },
    {
      name: 'Alternative Route',
      distance: '280 km',
      time: '7h',
      cost: '৳850',
      description: 'Alternative route via Narsingdi',
    },
  ];

  return (
    <div className="space-y-4">
      {routes.map((route, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`route-card cursor-pointer ${
            selectedRoute === index ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onRouteSelect(index)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{route.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {route.description}
              </p>
            </div>
            <span className="text-xs font-medium bg-secondary px-2 py-1 rounded-full">
              Route {index + 1}
            </span>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">{route.distance}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm">{route.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-sm">{route.cost}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};