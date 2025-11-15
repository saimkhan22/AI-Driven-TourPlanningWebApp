'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2, Car, Mountain, CloudRain, TriangleAlert as AlertTriangle } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIVehicleBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AIVehicleBot({ isOpen, onToggle }: AIVehicleBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Assalam-o-Alaikum! I\'m your AI vehicle assistant for Pakistan. I can help you choose the perfect vehicle for Pakistani roads, weather conditions, and destinations. How can I assist you today?',
      timestamp: new Date(),
      suggestions: [
        'Best vehicle for Hunza Valley?',
        'Which car for Karachi to Lahore?',
        'Vehicles for mountain areas?',
        'Budget vehicles under 5000 PKR?'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    // Vehicle recommendations based on keywords
    if (message.includes('hunza') || message.includes('skardu') || message.includes('mountain') || message.includes('northern')) {
      return {
        content: 'For Northern Areas like Hunza and Skardu, I recommend:\n\n🚙 **Toyota Fortuner** (PKR 9,500/day)\n- 4WD capability for mountain terrain\n- High ground clearance\n- Reliable in extreme weather\n\n🚗 **Toyota Prado** (PKR 12,000/day)\n- Premium 4WD for luxury travel\n- Excellent for high altitude\n- Professional driver included\n\n⚠️ **Weather Alert**: Check road conditions before traveling to northern areas, especially in winter.',
        suggestions: ['Weather conditions for Hunza?', 'Prado vs Fortuner comparison?', 'Mountain driving tips?']
      };
    }
    
    if (message.includes('karachi') || message.includes('lahore') || message.includes('city')) {
      return {
        content: 'For city travel between Karachi and Lahore:\n\n🚗 **Toyota Corolla** (PKR 3,500/day)\n- Comfortable for long highway drives\n- Good fuel efficiency\n- Air conditioning\n\n🚗 **Honda Civic** (PKR 4,500/day)\n- Premium comfort\n- Excellent for business travel\n- Advanced safety features\n\n💡 **Tip**: Use M2 Motorway for fastest route (4-5 hours)',
        suggestions: ['M2 Motorway conditions?', 'Fuel costs for this trip?', 'Rest areas on the way?']
      };
    }
    
    if (message.includes('budget') || message.includes('cheap') || message.includes('economical')) {
      return {
        content: 'Budget-friendly vehicles in Pakistan:\n\n🚗 **Suzuki Cultus** (PKR 2,500/day)\n- Most economical option\n- 20 km/l fuel efficiency\n- Perfect for city driving\n\n🚗 **Toyota Alto** (PKR 2,800/day)\n- Reliable and fuel-efficient\n- Easy parking in cities\n- Low maintenance\n\n💰 **Money-saving tip**: Book for 3+ days for discounts!',
        suggestions: ['Fuel efficiency comparison?', 'Weekly rental discounts?', 'Insurance included?']
      };
    }
    
    if (message.includes('family') || message.includes('group') || message.includes('7 seater')) {
      return {
        content: 'Perfect family vehicles for Pakistan:\n\n🚙 **Honda BR-V** (PKR 6,500/day)\n- 7-seater family SUV\n- Good ground clearance\n- Spacious interior\n\n🚐 **Suzuki APV** (PKR 6,000/day)\n- 8-seater van\n- Economical for large families\n- Reliable for hill stations\n\n🚌 **Toyota Hiace** (PKR 12,000/day)\n- 15-seater for extended family\n- Professional driver included',
        suggestions: ['Child seat availability?', 'Luggage space comparison?', 'Best for Murree trip?']
      };
    }
    
    if (message.includes('weather') || message.includes('fog') || message.includes('rain')) {
      return {
        content: '🌦️ **Current Weather Alerts for Pakistan**:\n\n❄️ **Northern Areas**: Snow expected, 4WD vehicles recommended\n🌫️ **Punjab (M2)**: Fog conditions, drive carefully\n🌧️ **Karachi**: Light rain, roads may be slippery\n\n**Vehicle Recommendations**:\n- Fog: Vehicles with fog lights (Corolla, Civic)\n- Rain: Good tire grip (Fortuner, Prado)\n- Snow: 4WD mandatory (Land Cruiser, Prado)',
        suggestions: ['4WD vehicles available?', 'Fog light equipped cars?', 'Winter driving tips?']
      };
    }
    
    if (message.includes('motorcycle') || message.includes('bike')) {
      return {
        content: 'Motorcycles for Pakistan:\n\n🏍️ **Honda 125cc** (PKR 1,500/day)\n- Most fuel-efficient (45 km/l)\n- Perfect for city navigation\n- Helmet included\n\n🏍️ **Yamaha YBR 125** (PKR 1,800/day)\n- Sporty design\n- Good for long rides\n- Reliable performance\n\n⚠️ **Safety Note**: Always wear helmet, avoid highways during fog',
        suggestions: ['Helmet sizes available?', 'Long distance on bike?', 'Bike insurance coverage?']
      };
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('rate')) {
      return {
        content: '💰 **Vehicle Pricing in Pakistan** (per day):\n\n**Economy Cars**: PKR 2,500 - 3,500\n**Standard Cars**: PKR 3,500 - 4,500\n**SUVs**: PKR 6,500 - 12,000\n**Vans**: PKR 6,000 - 12,000\n**Buses**: PKR 18,000 - 22,000\n**Motorcycles**: PKR 1,500 - 1,800\n\n**Additional Costs**:\n- Fuel: Customer responsibility\n- Driver: PKR 2,000/day extra\n- Insurance: Included in price',
        suggestions: ['Weekly discounts available?', 'Fuel cost estimates?', 'Driver charges?']
      };
    }
    
    if (message.includes('driver') || message.includes('chauffeur')) {
      return {
        content: '👨‍✈️ **Professional Drivers Available**:\n\n✅ **Included with**:\n- All SUVs (Fortuner, Prado)\n- Vans and Buses\n- Mountain vehicles\n\n💰 **Additional Cost**:\n- Cars: PKR 2,000/day extra\n- Motorcycles: Not available\n\n🎯 **Driver Benefits**:\n- Local route knowledge\n- Urdu/English speaking\n- Licensed and experienced\n- Know Pakistani traffic rules',
        suggestions: ['Driver for Corolla?', 'Mountain driving experience?', 'Multi-day trip drivers?']
      };
    }
    
    // Default response
    return {
      content: 'I can help you with:\n\n🚗 **Vehicle Selection** - Best cars for your destination\n🌦️ **Weather Updates** - Road conditions across Pakistan\n💰 **Pricing Info** - Transparent pricing for all vehicles\n🗺️ **Route Planning** - Best routes for Pakistani roads\n👨‍✈️ **Driver Services** - Professional drivers available\n\nWhat specific information do you need about vehicles in Pakistan?',
      suggestions: [
        'Show me SUVs for mountains',
        'Budget cars under 4000 PKR',
        'Weather conditions today',
        'Vehicles with drivers'
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg z-50"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-96 shadow-2xl z-50 transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[600px]'}`}>
      <CardHeader className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-sm">AI Vehicle Assistant</CardTitle>
              <p className="text-xs opacity-90">Pakistan Vehicle Expert</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[536px]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-orange-500' : 'bg-gray-200'}`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${message.type === 'user' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
                      <div className="text-sm whitespace-pre-line">{message.content}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {messages.length > 0 && messages[messages.length - 1].suggestions && (
                <div className="flex flex-wrap gap-2">
                  {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs h-8"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about vehicles in Pakistan..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}