import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button, Card } from '../components/ui';

const NotFound: FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Card padding="lg">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
