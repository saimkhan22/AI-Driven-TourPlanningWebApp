'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Mail, MessageSquare, X } from 'lucide-react';

interface TourConfirmationToastProps {
  show: boolean;
  onClose: () => void;
  destination: string;
}

export default function TourConfirmationToast({
  show,
  onClose,
  destination,
}: TourConfirmationToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      // Auto-hide after 8 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show && !visible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-white rounded-lg shadow-2xl border border-green-200 p-4 max-w-md">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              🎉 Tour Confirmed!
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Your trip to <span className="font-semibold text-orange-600">{destination}</span> has been confirmed.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>Confirmation email sent</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MessageSquare className="w-4 h-4 text-green-500" />
                <span>SMS notification sent</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 mt-3">
              Check your email and phone for full details
            </p>
          </div>
          
          <button
            onClick={() => {
              setVisible(false);
              setTimeout(onClose, 300);
            }}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

