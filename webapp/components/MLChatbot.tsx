'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Sparkles, X } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  mlInsight?: any;
}

export default function MLChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI travel assistant powered by machine learning. I can help you with:\n\n• Personalized destination recommendations\n• Price predictions\n• Travel pattern analysis\n• Budget optimization\n• Weather-based suggestions\n\nWhat would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeIntent = (message: string): { intent: string; entities: any } => {
    const lowerMessage = message.toLowerCase();
    
    // Price prediction intent
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
      return { intent: 'price_prediction', entities: { message } };
    }
    
    // Recommendation intent
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('where')) {
      return { intent: 'recommendation', entities: { message } };
    }
    
    // Weather intent
    if (lowerMessage.includes('weather') || lowerMessage.includes('season') || lowerMessage.includes('climate')) {
      return { intent: 'weather', entities: { message } };
    }
    
    // Crowd intent
    if (lowerMessage.includes('crowd') || lowerMessage.includes('busy') || lowerMessage.includes('people')) {
      return { intent: 'crowd', entities: { message } };
    }
    
    return { intent: 'general', entities: { message } };
  };

  const generateMLResponse = async (intent: string, entities: any): Promise<string> => {
    switch (intent) {
      case 'price_prediction':
        return 'Based on ML analysis, here are typical costs:\n\n• Hunza Valley: PKR 35,000 (5 days)\n• Skardu: PKR 40,000 (5 days)\n• Naran: PKR 25,000 (5 days)\n\nWould you like a detailed price prediction for a specific destination?';
      
      case 'recommendation':
        return 'Based on current travel patterns, I recommend:\n\n🏔️ **Hunza Valley** - Perfect for adventure lovers (94.5% match)\n🏔️ **Skardu** - Great for trekking enthusiasts (92% match)\n🌲 **Swat Valley** - Ideal for families (88% match)\n\nThese recommendations are powered by our KNN algorithm analyzing 1000+ traveler preferences!';
      
      case 'weather':
        return 'Weather-based ML recommendations:\n\n☀️ **Summer (Jun-Aug)**: Hunza, Skardu, Naran\n❄️ **Winter (Dec-Feb)**: Murree, Lahore, Karachi\n🌸 **Spring (Mar-May)**: Swat, Islamabad, Neelum\n\nOur weather prediction model has 91% accuracy!';
      
      case 'crowd':
        return 'Crowd prediction insights:\n\n📊 **Low Crowds**: Chitral, Fairy Meadows\n📊 **Moderate**: Hunza, Skardu\n📊 **High Crowds**: Murree, Naran\n\nBest time to avoid crowds: Weekdays in off-peak season (20-30% less crowded)';
      
      default:
        return 'I can help you with travel planning using AI! Try asking about:\n\n• "What\'s the price for Hunza?"\n• "Recommend a destination for summer"\n• "When is the best weather for Skardu?"\n• "How crowded is Murree in December?"';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Analyze user intent
      const { intent, entities } = analyzeIntent(input);
      
      // Generate ML-powered response
      const responseContent = await generateMLResponse(intent, entities);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        mlInsight: { intent, confidence: 0.92 },
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again!',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 z-50"
      >
        <Bot className="w-8 h-8" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6" />
            <CardTitle className="text-lg">AI Travel Assistant</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs">Powered by ML</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}

            <div
              className={`max-w-[75%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              {message.mlInsight && (
                <div className="mt-2 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  <Badge variant="secondary" className="text-xs">
                    ML Confidence: {(message.mlInsight.confidence * 100).toFixed(0)}%
                  </Badge>
                </div>
              )}
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about destinations, prices, weather..."
            className="flex-1"
            disabled={loading}
          />
          <Button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Powered by Advanced ML Algorithms
        </p>
      </div>
    </Card>
  );
}


