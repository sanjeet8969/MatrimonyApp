import React, { useState } from 'react';
import { Crown, X, ArrowRight, Star, Zap, Eye } from 'lucide-react';
import Button from '../common/Button';

const PremiumBanner = ({ onUpgrade, onDismiss, variant = 'top' }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const features = [
    { icon: Eye, text: 'See who viewed your profile' },
    { icon: Star, text: 'Get highlighted in search' },
    { icon: Zap, text: 'Unlimited interests & messages' }
  ];

  if (variant === 'card') {
    return (
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <button
            onClick={handleDismiss}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Crown className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Upgrade to Premium</h3>
            <p className="text-yellow-100 mb-4">
              Get 3x more profile views and find your match faster
            </p>
            
            <div className="space-y-2 mb-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-yellow-200" />
                    <span className="text-sm text-yellow-100">{feature.text}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="secondary"
                onClick={onUpgrade}
                className="bg-white text-yellow-600 hover:bg-yellow-50"
              >
                Upgrade Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <div className="text-yellow-100">
                <span className="line-through text-sm">₹1,999</span>
                <span className="text-lg font-bold ml-2">₹999/month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
      <div className="container-responsive py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="w-5 h-5" />
            <span className="font-medium">
              Upgrade to Premium and get 50% more matches!
            </span>
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
              Limited Time
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="secondary"
              onClick={onUpgrade}
              className="bg-white text-yellow-600 hover:bg-yellow-50"
            >
              Upgrade Now
            </Button>
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumBanner;
