import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const SubscriptionSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { sessionId, planId } = location.state || {};
  
  useEffect(() => {
    if (!sessionId || !planId) {
      navigate('/subscription');
    }
  }, [sessionId, planId, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-8"
          >
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto"
              >
                <CheckCircle className="h-8 w-8 text-success-500" />
              </motion.div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            
            <p className="text-gray-600 mb-8">
              Thank you for your subscription. You now have full access to all our premium content and activities.
            </p>
            
            <div className="space-y-4">
              <Link to="/activities">
                <Button 
                  variant="primary"
                  fullWidth
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                >
                  Explore Activities
                </Button>
              </Link>
              
              <Link to="/dashboard">
                <Button 
                  variant="outline"
                  fullWidth
                >
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccessPage;