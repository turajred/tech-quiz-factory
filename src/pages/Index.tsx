import { useState } from 'react';
import { MapVisualization } from '../components/MapVisualization';
import { RoutePanel } from '../components/RoutePanel';
import { mergeSort } from '../utils/pathFinder';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

export interface Route {
  name: string;
  distance: string;
  time: string;
  cost: string;
  description: string;
  perk: string;
}

const routes: Route[] = [
  {
    name: 'Direct Route',
    distance: '264',
    time: '6h 30m',
    cost: '৳800',
    description: 'Direct highway route via N1',
    perk: 'Complimentary snack box'
  },
  {
    name: 'Scenic Route',
    distance: '295',
    time: '7h 45m',
    cost: '৳950',
    description: 'Scenic route via Comilla',
    perk: 'Free buffet at Comilla Rest Stop'
  },
  {
    name: 'Alternative Route',
    distance: '280',
    time: '7h',
    cost: '৳850',
    description: 'Alternative route via Narsingdi',
    perk: '20% off at local restaurants'
  },
  {
    name: 'Coastal Route',
    distance: '310',
    time: '8h',
    cost: '৳1100',
    description: 'Scenic coastal drive via Cox\'s Bazar',
    perk: 'Beach resort day pass included'
  },
  {
    name: 'Heritage Route',
    distance: '285',
    time: '7h 15m',
    cost: '৳900',
    description: 'Route through historical sites',
    perk: 'Free guided tour at heritage spots'
  },
  {
    name: 'Express Route',
    distance: '270',
    time: '6h 45m',
    cost: '৳950',
    description: 'Premium highway experience',
    perk: 'VIP lounge access at rest stops'
  },
  {
    name: 'Adventure Route',
    distance: '305',
    time: '8h 30m',
    cost: '৳1000',
    description: 'Off-road scenic experience',
    perk: 'Adventure activities package included'
  },
  {
    name: 'Comfort Route',
    distance: '275',
    time: '7h',
    cost: '৳925',
    description: 'Route with premium rest stops',
    perk: 'Spa service voucher included'
  },
  {
    name: 'Local Route',
    distance: '290',
    time: '7h 30m',
    cost: '৳875',
    description: 'Experience local culture',
    perk: 'Traditional food tasting experience'
  },
  {
    name: 'Night Route',
    distance: '268',
    time: '6h 15m',
    cost: '৳850',
    description: 'Optimized for night travel',
    perk: 'Complimentary night kit & coffee'
  }
];

const Index = () => {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [sortedRoutes, setSortedRoutes] = useState<Route[]>([]);
  const { toast } = useToast();

  const handleFindPath = async () => {
    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate calculation
    
    const sorted = mergeSort([...routes]) as Route[];
    setSortedRoutes(sorted);
    setSelectedRoute(routes.findIndex(r => r.distance === sorted[0].distance));
    
    toast({
      title: "Shortest Path Found!",
      description: `The ${sorted[0].name} is the shortest with ${sorted[0].distance} km.`,
    });
    
    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <span className="px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded-full">
            Path Finder
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Dhaka to Chattogram Route Optimizer
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most efficient route between Dhaka and Chattogram with our interactive path finder.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MapVisualization selectedRoute={selectedRoute} />
          </div>
          <div className="space-y-6">
            <RoutePanel 
              onRouteSelect={setSelectedRoute}
              selectedRoute={selectedRoute}
            />
            <div className="mt-4">
              <Button 
                className="w-full"
                onClick={handleFindPath}
                disabled={isCalculating}
              >
                {isCalculating ? 'Calculating...' : 'Find Shortest Path'}
              </Button>
            </div>
            
            {sortedRoutes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondary p-4 rounded-lg"
              >
                <h3 className="font-semibold mb-2">Sorted Routes by Distance</h3>
                <div className="space-y-2">
                  {sortedRoutes.map((route, index) => (
                    <div key={index} className="text-sm flex justify-between items-center">
                      <span>{route.name}</span>
                      <span className="font-medium">{route.distance} km</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
