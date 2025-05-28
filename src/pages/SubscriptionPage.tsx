import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import subscriptionPlans from '../data/subscriptionData';
import Button from '../components/ui/Button';

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = async (planId: string) => {
    try {
      setLoading(true);
      setError('');

      if (!user) {
        navigate('/login');
        return;
      }

      // Navigate to card details page with plan info
      navigate('/subscription/card-details', { 
        state: { planId } 
      });
      
    } catch (err: any) {
      setError(err.message || 'Failed to process subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600">
            Select the perfect subscription plan for your child's learning journey
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8 bg-red-50 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-lg shadow-sm p-6 border-2 ${
                plan.mostPopular ? 'border-primary-500' : 'border-transparent'
              }`}
            >
              {plan.mostPopular && (
                <div className="bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className={`flex items-start ${
                      feature.included ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    <svg
                      className={`h-6 w-6 mr-2 ${
                        feature.included ? 'text-green-500' : 'text-gray-300'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                          feature.included
                            ? 'M5 13l4 4L19 7'
                            : 'M6 18L18 6M6 6l12 12'
                        }
                      />
                    </svg>
                    {feature.name}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.mostPopular ? 'primary' : 'outline'}
                fullWidth
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading}
              >
                {loading ? 'Processing...' : `Subscribe to ${plan.name}`}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Subscription FAQs
          </h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-medium text-gray-900">When will I be charged?</dt>
              <dd className="mt-2 text-gray-600">
                You'll be charged immediately upon subscribing, and then on the same
                date each month/year depending on your plan.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Can I cancel anytime?</dt>
              <dd className="mt-2 text-gray-600">
                Yes, you can cancel your subscription at any time. You'll continue
                to have access until the end of your billing period.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">
                Is there a refund policy?
              </dt>
              <dd className="mt-2 text-gray-600">
                We offer a 30-day money-back guarantee if you're not satisfied with
                your subscription.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;