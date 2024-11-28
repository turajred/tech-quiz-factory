import { motion } from 'framer-motion';
import { Clock, DollarSign, MapPin, Gift } from 'lucide-react';
import { Route } from '../pages/Index';

interface Props {
  onRouteSelect: (index: number) => void;
  selectedRoute: number | null;
}

export const RoutePanel = ({ onRouteSelect, selectedRoute }: Props) => {
  const routes: Route[] = [
    {
      name: 'Direct Route',
      distance: '264 km',
      time: '6h 30m',
      cost: '৳800',
      description: 'Direct highway route via N1',
      perk: 'Complimentary snack box'
    },
    {
      name: 'Scenic Route',
      distance: '295 km',
      time: '7h 45m',
      cost: '৳950',
      description: 'Scenic route via Comilla',
      perk: 'Free buffet at Comilla Rest Stop'
    },
    {
      name: 'Alternative Route',
      distance: '280 km',
      time: '7h',
      cost: '৳850',
      description: 'Alternative route via Narsingdi',
      perk: '20% off at local restaurants'
    },
    {
      name: 'Coastal Route',
      distance: '310 km',
      time: '8h',
      cost: '৳1100',
      description: 'Scenic coastal drive via Cox\'s Bazar',
      perk: 'Beach resort day pass included'
    },
    {
      name: 'Heritage Route',
      distance: '285 km',
      time: '7h 15m',
      cost: '৳900',
      description: 'Route through historical sites',
      perk: 'Free guided tour at heritage spots'
    },
    {
      name: 'Express Route',
      distance: '270 km',
      time: '6h 45m',
      cost: '৳950',
      description: 'Premium highway experience',
      perk: 'VIP lounge access at rest stops'
    },
    {
      name: 'Adventure Route',
      distance: '305 km',
      time: '8h 30m',
      cost: '৳1000',
      description: 'Off-road scenic experience',
      perk: 'Adventure activities package included'
    },
    {
      name: 'Comfort Route',
      distance: '275 km',
      time: '7h',
      cost: '৳925',
      description: 'Route with premium rest stops',
      perk: 'Spa service voucher included'
    },
    {
      name: 'Local Route',
      distance: '290 km',
      time: '7h 30m',
      cost: '৳875',
      description: 'Experience local culture',
      perk: 'Traditional food tasting experience'
    },
    {
      name: 'Night Route',
      distance: '268 km',
      time: '6h 15m',
      cost: '৳850',
      description: 'Optimized for night travel',
      perk: 'Complimentary night kit & coffee'
    }
  ];

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
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

          <div className="mt-3 flex items-center gap-2 text-sm text-primary">
            <Gift className="w-4 h-4" />
            <span>{route.perk}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
