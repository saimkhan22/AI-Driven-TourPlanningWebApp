'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2, Sparkles, MapPin, Hotel, Car, Mountain, Sun, CloudRain } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AITravelBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AITravelBot({ isOpen, onToggle }: AITravelBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Assalam-o-Alaikum! Welcome to SMM Travel! 🇵🇰\n\nI\'m your AI travel assistant for Pakistan. I can help you with:\n\n🏨 **Hotel recommendations** across Pakistan\n🚗 **Vehicle bookings** for any terrain\n🗺️ **Destination planning** with cultural insights\n🌦️ **Weather updates** and travel conditions\n📍 **Route planning** for Pakistani roads\n\nHow can I help you explore the beauty of Pakistan today?',
      timestamp: new Date(),
      suggestions: [
        'Plan a trip to Hunza Valley',
        'Find hotels in Skardu',
        'Best vehicle for northern areas?',
        'Weather in Lahore today'
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
    
    // Destination planning
    if (message.includes('hunza') || message.includes('karimabad')) {
      return {
        content: '🏔️ **Hunza Valley - Crown Jewel of Pakistan!**\n\n**Best Time to Visit:** April to October\n**Duration:** 5-7 days recommended\n\n🏨 **Top Hotels:**\n• Hunza Serena Inn (PKR 12,000/night)\n• Eagle Nest Hotel Duikar (PKR 8,500/night)\n\n🚗 **Recommended Vehicle:**\n• Toyota Fortuner (4WD) - PKR 9,500/day\n• Professional driver included\n\n📍 **Must-Visit Places:**\n• Baltit Fort & Altit Fort\n• Attabad Lake boat ride\n• Passu Cones viewpoint\n• Eagle Nest for sunrise\n\n🌦️ **Current Weather:** Clear, 15°C\n💡 **Pro Tip:** Book accommodations in advance during peak season!',
        suggestions: ['Book Hunza hotels', 'Hunza travel itinerary', 'Weather forecast Hunza', 'Vehicle for Hunza trip']
      };
    }
    
    if (message.includes('skardu') || message.includes('shangrila')) {
      return {
        content: '🏔️ **Skardu - Gateway to K2!**\n\n**Best Time:** May to September\n**Duration:** 6-8 days\n\n🏨 **Premium Stays:**\n• Shangrila Resort (PKR 15,000/night)\n• Concordia Motel (PKR 7,500/night)\n\n🚗 **Vehicle Needed:**\n• Toyota Prado (4WD) - PKR 12,000/day\n• Essential for mountain terrain\n\n📍 **Highlights:**\n• Shangrila Resort & Lower Kachura Lake\n• Deosai Plains (Land of Giants)\n• Satpara Lake & Dam\n• K2 Base Camp (for adventurers)\n\n🌦️ **Weather Alert:** Cold nights, warm days\n⚠️ **Important:** Road conditions can change rapidly',
        suggestions: ['Book Skardu hotels', 'K2 base camp tour', 'Deosai Plains visit', 'Skardu weather update']
      };
    }
    
    if (message.includes('lahore') || message.includes('food street')) {
      return {
        content: '🕌 **Lahore - Cultural Heart of Pakistan!**\n\n**Best Time:** October to March\n**Duration:** 3-4 days\n\n🏨 **Top Hotels:**\n• Pearl Continental Lahore (PKR 8,500/night)\n• Luxury accommodations in city center\n\n🚗 **City Transport:**\n• Toyota Corolla (PKR 3,500/day)\n• Honda Civic for business travel\n\n📍 **Must-See:**\n• Badshahi Mosque & Lahore Fort\n• Shalimar Gardens\n• Food Street (Gawalmandi)\n• Anarkali & Liberty Markets\n\n🍽️ **Food Highlights:**\n• Lahori Karahi, Kulfi, Lassi\n• Traditional Pakistani breakfast\n\n🌦️ **Current:** 28°C, sunny',
        suggestions: ['Lahore food tour', 'Historical sites Lahore', 'Best restaurants Lahore', 'Lahore shopping guide']
      };
    }
    
    // Hotel recommendations
    if (message.includes('hotel') || message.includes('accommodation')) {
      return {
        content: '🏨 **Hotel Recommendations Across Pakistan:**\n\n**Northern Areas:**\n• Hunza Serena Inn - Mountain luxury\n• Shangrila Resort Skardu - Lake views\n• Swat Continental - Valley comfort\n\n**Major Cities:**\n• Pearl Continental Lahore - Business hub\n• Avari Towers Karachi - Coastal luxury\n• Serena Islamabad - Capital elegance\n\n**Hill Stations:**\n• PC Bhurban Murree - Golf resort\n• Kalam Inn Swat - River views\n• Naran Inn - Lake access\n\n💰 **Price Range:** PKR 4,000 - 18,000/night\n🎯 **All include:** AC, WiFi, Pakistani breakfast\n📞 **Booking:** Available 24/7 with instant confirmation',
        suggestions: ['Book northern area hotels', 'City hotels Pakistan', 'Budget accommodations', 'Luxury resorts Pakistan']
      };
    }
    
    // Vehicle recommendations
    if (message.includes('vehicle') || message.includes('car') || message.includes('transport')) {
      return {
        content: '🚗 **Vehicle Options for Pakistan:**\n\n**City Travel:**\n• Suzuki Alto - Most economical (PKR 2,500/day)\n• Toyota Corolla - Reliable choice (PKR 3,500/day)\n• Honda Civic - Premium comfort (PKR 4,500/day)\n\n**Mountain Areas:**\n• Toyota Fortuner - 4WD essential (PKR 9,500/day)\n• Toyota Prado - Luxury 4WD (PKR 12,000/day)\n• Land Cruiser - Extreme terrain (PKR 15,000/day)\n\n**Group Travel:**\n• Suzuki APV - 8 seater (PKR 6,000/day)\n• Toyota Hiace - 15 seater (PKR 12,000/day)\n• Pakistani Coaster - 25+ seater (PKR 18,000/day)\n\n✅ **All Include:** Insurance, 24/7 support\n👨‍✈️ **Professional drivers available**',
        suggestions: ['Book mountain vehicle', 'City car rental', 'Group transport', 'Vehicle with driver']
      };
    }
    
    // Weather information
    if (message.includes('weather') || message.includes('temperature')) {
      return {
        content: '🌦️ **Current Weather Across Pakistan:**\n\n**Northern Areas:**\n• Hunza: 15°C, Clear skies ☀️\n• Skardu: 12°C, Partly cloudy ⛅\n• Chitral: -8°C, Snow expected ❄️\n\n**Major Cities:**\n• Islamabad: 25°C, Clear ☀️\n• Lahore: 18°C, Foggy conditions 🌫️\n• Karachi: 28°C, Humid 🌊\n\n**Travel Alerts:**\n⚠️ **M2 Motorway:** Dense fog, drive carefully\n❄️ **Lowari Pass:** Snow, 4WD required\n🌧️ **Swat Valley:** Light rain expected\n\n**Vehicle Recommendations:**\n• Fog: Use cars with fog lights\n• Snow: 4WD vehicles mandatory\n• Rain: Avoid motorcycles',
        suggestions: ['Northern areas weather', 'Motorway conditions', 'Mountain pass status', 'Best travel time']
      };
    }
    
    // Route planning
    if (message.includes('route') || message.includes('road') || message.includes('how to reach')) {
      return {
        content: '🛣️ **Pakistani Route Planning:**\n\n**Major Highways:**\n• **M2 Motorway:** Islamabad-Lahore (4 hours)\n• **M9 Motorway:** Karachi-Hyderabad (2 hours)\n• **Karakoram Highway:** To northern areas\n• **GT Road:** Historical route across Punjab\n\n**Mountain Routes:**\n• **Lowari Pass:** Dir to Chitral\n• **Babusar Pass:** Naran to Gilgit\n• **Shandur Pass:** Chitral to Gilgit\n\n**Current Conditions:**\n✅ **M2:** Clear, light traffic\n⚠️ **Karakoram Highway:** Check weather\n❄️ **Mountain Passes:** Winter closures possible\n\n**Pro Tips:**\n• Fuel up before mountain routes\n• Carry emergency supplies\n• Check road conditions',
        suggestions: ['M2 motorway conditions', 'Mountain pass status', 'Fuel stations route', 'Emergency contacts']
      };
    }
    
    // Cultural and travel tips
    if (message.includes('culture') || message.includes('tips') || message.includes('advice')) {
      return {
        content: '🇵🇰 **Pakistani Travel Cultural Guide:**\n\n**Cultural Etiquette:**\n• Greet with "Assalam-o-Alaikum"\n• Dress modestly, especially at religious sites\n• Remove shoes when entering homes/mosques\n• Use right hand for eating and greeting\n\n**Language Tips:**\n• Urdu is widely understood\n• "Shukriya" = Thank you\n• "Maaf kijiye" = Excuse me\n• English spoken in tourist areas\n\n**Local Customs:**\n• Friday prayers (12-2 PM) - expect closures\n• Ramadan considerations\n• Hospitality is exceptional\n• Tea culture is important\n\n**Safety Tips:**\n• Register with local authorities in northern areas\n• Carry ID at all times\n• Respect photography restrictions',
        suggestions: ['Pakistani food guide', 'Religious site etiquette', 'Local customs', 'Safety guidelines']
      };
    }
    
    // Default response
    return {
      content: 'I\'m here to help you explore Pakistan! 🇵🇰\n\nI can assist you with:\n\n🏨 **Hotels & Accommodations**\n🚗 **Vehicle Rentals & Transport**\n🗺️ **Destination Planning**\n🌦️ **Weather & Road Conditions**\n📍 **Route Planning**\n🍽️ **Food & Cultural Tips**\n\nWhat would you like to know about traveling in Pakistan?',
      suggestions: [
        'Plan a Pakistan trip',
        'Best destinations in Pakistan',
        'Hotel recommendations',
        'Vehicle booking help'
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
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-sm">SMM Travel AI Assistant</CardTitle>
              <p className="text-xs opacity-90">Your Pakistan Travel Guide</p>
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
                        <Sparkles className="w-4 h-4 text-gray-600" />
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
                      <Sparkles className="w-4 h-4 text-gray-600" />
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
                placeholder="Ask about Pakistan travel..."
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