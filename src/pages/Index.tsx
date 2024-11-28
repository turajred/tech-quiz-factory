import { useState } from 'react';
import { MapVisualization } from '../components/MapVisualization';
import { RoutePanel } from '../components/RoutePanel';
import { calculateShortestPath } from '../utils/pathFinder';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Index = () => {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleFindPath = async () => {
    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate calculation
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
          <div>
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
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;