'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  TrendingUp,
  Target,
  DollarSign,
  MapPin,
  ArrowLeft,
  Loader2,
  Star,
  BarChart3,
  Cloud,
  Users,
  Wallet,
  Activity,
} from 'lucide-react';
import Link from 'next/link';
import MLPerformanceMetrics from '@/components/MLPerformanceMetrics';

export default function MLInsightsPage() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [pricePrediction, setPricePrediction] = useState<any>(null);
  const [travelPatterns, setTravelPatterns] = useState<any>(null);
  const [weatherRec, setWeatherRec] = useState<any>(null);
  const [crowdPrediction, setCrowdPrediction] = useState<any>(null);
  const [budgetAllocation, setBudgetAllocation] = useState<any>(null);
  const [similarDests, setSimilarDests] = useState<any>(null);

  // Form states
  const [budget, setBudget] = useState('medium');
  const [travelStyle, setTravelStyle] = useState('adventure');
  const [interests, setInterests] = useState('hiking,photography,culture');
  const [destination, setDestination] = useState('Hunza Valley');
  const [duration, setDuration] = useState('5');
  const [travelers, setTravelers] = useState('2');
  const [season, setSeason] = useState('summer');
  const [travelMonth, setTravelMonth] = useState('6');
  const [travelDate, setTravelDate] = useState('2026-06-15');
  const [holidayType, setHolidayType] = useState('regular');
  const [totalBudget, setTotalBudget] = useState('50000');

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/ml/recommendations', {
        action: 'personalized_recommendations',
        data: {
          budget,
          travelStyle,
          interests: interests.split(',').map((i) => i.trim()),
          previousDestinations: [],
        },
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPricePrediction = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/ml/recommendations', {
        action: 'price_prediction',
        data: {
          destination,
          duration: parseInt(duration),
          travelers: parseInt(travelers),
          budget,
          season,
        },
      });
      setPricePrediction(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeTravelPatterns = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/ml/recommendations', {
        action: 'travel_patterns',
        data: {
          userHistory: [
            { destination: 'Murree', duration: 3, travelers: 2, budget: 'low', season: 'winter' },
            { destination: 'Naran', duration: 5, travelers: 4, budget: 'medium', season: 'summer' },
            { destination: 'Hunza', duration: 7, travelers: 2, budget: 'high', season: 'summer' },
          ],
        },
      });
      setTravelPatterns(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/ml/advanced', {
        action: 'weather_recommendations',
        data: {
          month: parseInt(travelMonth),
          preferences: { budget, travelStyle, interests: interests.split(',') },
        },
      });
      setWeatherRec(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCrowdPrediction = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/ml/advanced', {
        action: 'crowd_prediction',
        data: {
          destination,
          date: travelDate,
          holidayType,
        },
      });
      setCrowdPrediction(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBudgetAllocation = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/ml/advanced', {
        action: 'budget_allocation',
        data: {
          totalBudget: parseInt(totalBudget),
          duration: parseInt(duration),
          travelers: parseInt(travelers),
          preferences: { travelStyle, interests: interests.split(',') },
        },
      });
      setBudgetAllocation(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSimilarDestinations = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/ml/advanced', {
        action: 'similar_destinations',
        data: { destination },
      });
      setSimilarDests(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <Brain className="w-8 h-8 text-purple-600" />
                  <h1 className="text-3xl font-bold text-gray-900">AI & ML Insights</h1>
                </div>
                <p className="text-gray-600 mt-1">
                  Powered by advanced machine learning algorithms
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ML Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="pt-6">
              <Target className="w-12 h-12 mb-3 opacity-90" />
              <h3 className="font-semibold text-lg mb-1">KNN Algorithm</h3>
              <p className="text-sm opacity-90">Personalized Recommendations</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="pt-6">
              <TrendingUp className="w-12 h-12 mb-3 opacity-90" />
              <h3 className="font-semibold text-lg mb-1">Linear Regression</h3>
              <p className="text-sm opacity-90">Price Prediction</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="pt-6">
              <BarChart3 className="w-12 h-12 mb-3 opacity-90" />
              <h3 className="font-semibold text-lg mb-1">Decision Tree</h3>
              <p className="text-sm opacity-90">Pattern Analysis</p>
            </CardContent>
          </Card>
        </div>

        {/* ML Features Tabs */}
        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="recommendations">
              <Target className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Recommendations</span>
              <span className="sm:hidden">Rec</span>
            </TabsTrigger>
            <TabsTrigger value="price">
              <DollarSign className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Price</span>
              <span className="sm:hidden">$</span>
            </TabsTrigger>
            <TabsTrigger value="patterns">
              <BarChart3 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Patterns</span>
              <span className="sm:hidden">Pat</span>
            </TabsTrigger>
            <TabsTrigger value="weather">
              <Cloud className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Weather</span>
              <span className="sm:hidden">Wea</span>
            </TabsTrigger>
            <TabsTrigger value="crowd">
              <Users className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Crowds</span>
              <span className="sm:hidden">Crd</span>
            </TabsTrigger>
            <TabsTrigger value="budget">
              <Wallet className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Budget</span>
              <span className="sm:hidden">Bdg</span>
            </TabsTrigger>
            <TabsTrigger value="metrics">
              <Activity className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Metrics</span>
              <span className="sm:hidden">Met</span>
            </TabsTrigger>
          </TabsList>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Destination Recommendations</CardTitle>
                <CardDescription>
                  Using K-Nearest Neighbors (KNN) algorithm to find destinations matching your preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label>Budget</Label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (PKR 10-20k)</SelectItem>
                        <SelectItem value="medium">Medium (PKR 20-40k)</SelectItem>
                        <SelectItem value="high">High (PKR 40-60k)</SelectItem>
                        <SelectItem value="luxury">Luxury (PKR 60k+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Travel Style</Label>
                    <Select value={travelStyle} onValueChange={setTravelStyle}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="relaxation">Relaxation</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Interests (comma-separated)</Label>
                    <Input
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                      placeholder="hiking, photography, culture"
                    />
                  </div>
                </div>

                <Button
                  onClick={getRecommendations}
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Get AI Recommendations
                    </>
                  )}
                </Button>

                {recommendations && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Top Recommendations</h3>
                      <Badge variant="outline">{recommendations.algorithm}</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {recommendations.recommendations.map((dest: any, idx: number) => (
                        <Card key={idx} className="hover:shadow-lg transition-shadow">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-lg">{dest.name}</h4>
                                <Badge className="mt-1">{dest.category}</Badge>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-semibold">{dest.popularity}</span>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Avg Cost:</span>
                                <span className="font-semibold">PKR {dest.avgCost.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Best Season:</span>
                                <span className="font-semibold">{dest.season.join(', ')}</span>
                              </div>
                              <div className="mt-3">
                                <span className="text-gray-600 text-xs">Activities:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {dest.activities.map((activity: string, i: number) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                      {activity}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Price Prediction Tab */}
          <TabsContent value="price" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Price Prediction</CardTitle>
                <CardDescription>
                  Using Linear Regression to predict trip costs with detailed breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <Select value={destination} onValueChange={setDestination}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hunza Valley">Hunza Valley</SelectItem>
                        <SelectItem value="Skardu">Skardu</SelectItem>
                        <SelectItem value="Naran Kaghan">Naran Kaghan</SelectItem>
                        <SelectItem value="Swat Valley">Swat Valley</SelectItem>
                        <SelectItem value="Murree">Murree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Duration (days)</Label>
                    <Input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      min="1"
                      max="30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Travelers</Label>
                    <Input
                      type="number"
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      min="1"
                      max="20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Season</Label>
                    <Select value={season} onValueChange={setSeason}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summer">Summer</SelectItem>
                        <SelectItem value="winter">Winter</SelectItem>
                        <SelectItem value="spring">Spring</SelectItem>
                        <SelectItem value="autumn">Autumn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={getPricePrediction}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-4 h-4 mr-2" />
                      Predict Price
                    </>
                  )}
                </Button>

                {pricePrediction && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">Price Prediction</h3>
                      <Badge variant="outline">{pricePrediction.algorithm}</Badge>
                    </div>

                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <CardContent className="pt-6">
                        <div className="text-center mb-6">
                          <p className="text-sm text-gray-600 mb-2">Estimated Total Cost</p>
                          <p className="text-4xl font-bold text-blue-600">
                            PKR {pricePrediction.prediction.estimatedCost.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600 mt-2">
                            Confidence: {(pricePrediction.prediction.confidence * 100).toFixed(0)}%
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm text-gray-700">Cost Breakdown:</h4>
                          {Object.entries(pricePrediction.prediction.breakdown).map(([key, value]: [string, any]) => (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-sm capitalize text-gray-600">{key}:</span>
                              <span className="font-semibold">PKR {value.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Travel Patterns Tab */}
          <TabsContent value="patterns" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Travel Pattern Analysis</CardTitle>
                <CardDescription>
                  Using Decision Tree algorithm to analyze your travel behavior and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={analyzeTravelPatterns}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 mb-6"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analyze My Travel Patterns
                    </>
                  )}
                </Button>

                {travelPatterns && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Your Travel Insights</h3>
                      <Badge variant="outline">{travelPatterns.algorithm}</Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="bg-green-50 border-green-200">
                        <CardContent className="pt-6">
                          <p className="text-sm text-gray-600 mb-1">Preferred Season</p>
                          <p className="text-2xl font-bold text-green-600 capitalize">
                            {travelPatterns.patterns.preferredSeason}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="pt-6">
                          <p className="text-sm text-gray-600 mb-1">Average Budget</p>
                          <p className="text-2xl font-bold text-blue-600">
                            PKR {travelPatterns.patterns.avgBudget.toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-purple-50 border-purple-200">
                        <CardContent className="pt-6">
                          <p className="text-sm text-gray-600 mb-1">Avg Duration</p>
                          <p className="text-2xl font-bold text-purple-600">
                            {travelPatterns.patterns.preferredDuration} days
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Travel Frequency</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Badge className="text-lg px-4 py-2 capitalize">
                          {travelPatterns.patterns.travelFrequency} Traveler
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">AI Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {travelPatterns.patterns.recommendations.map((rec: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Star className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Weather-Based Recommendations Tab */}
          <TabsContent value="weather" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Weather-Based ML Recommendations</CardTitle>
                <CardDescription>
                  Get destination recommendations based on weather patterns and seasonal data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label>Travel Month</Label>
                    <Select value={travelMonth} onValueChange={setTravelMonth}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">January</SelectItem>
                        <SelectItem value="2">February</SelectItem>
                        <SelectItem value="3">March</SelectItem>
                        <SelectItem value="4">April</SelectItem>
                        <SelectItem value="5">May</SelectItem>
                        <SelectItem value="6">June</SelectItem>
                        <SelectItem value="7">July</SelectItem>
                        <SelectItem value="8">August</SelectItem>
                        <SelectItem value="9">September</SelectItem>
                        <SelectItem value="10">October</SelectItem>
                        <SelectItem value="11">November</SelectItem>
                        <SelectItem value="12">December</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Travel Style</Label>
                    <Select value={travelStyle} onValueChange={setTravelStyle}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="relaxation">Relaxation</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={getWeatherRecommendations}
                  disabled={loading}
                  className="w-full bg-sky-600 hover:bg-sky-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Weather...
                    </>
                  ) : (
                    <>
                      <Cloud className="w-4 h-4 mr-2" />
                      Get Weather-Based Recommendations
                    </>
                  )}
                </Button>

                {weatherRec && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Best Destinations for {weatherRec.season}</h3>
                      <Badge variant="outline">{weatherRec.algorithm}</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {weatherRec.recommendations.map((dest: any, idx: number) => (
                        <Card key={idx} className="hover:shadow-lg transition-shadow">
                          <CardContent className="pt-6">
                            <h4 className="font-semibold text-lg mb-2">{dest.name}</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Temperature:</span>
                                <span className="font-semibold">{dest.temperature}°C</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Comfort Level:</span>
                                <Progress value={dest.comfortLevel * 10} className="w-20" />
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Expected Crowd:</span>
                                <Badge variant="secondary">{Math.round(dest.expectedCrowd)}/10</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Adjusted Price:</span>
                                <span className="font-semibold">PKR {dest.adjustedPrice.toLocaleString()}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Crowd Prediction Tab */}
          <TabsContent value="crowd" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Crowd Prediction</CardTitle>
                <CardDescription>
                  Predict crowd levels and pricing for your travel dates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <Select value={destination} onValueChange={setDestination}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hunza Valley">Hunza Valley</SelectItem>
                        <SelectItem value="Skardu">Skardu</SelectItem>
                        <SelectItem value="Naran Kaghan">Naran Kaghan</SelectItem>
                        <SelectItem value="Swat Valley">Swat Valley</SelectItem>
                        <SelectItem value="Murree">Murree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Travel Date</Label>
                    <Input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Holiday Type</Label>
                    <Select value={holidayType} onValueChange={setHolidayType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Regular Day</SelectItem>
                        <SelectItem value="long_weekend">Long Weekend</SelectItem>
                        <SelectItem value="summer_vacation">Summer Vacation</SelectItem>
                        <SelectItem value="winter_vacation">Winter Vacation</SelectItem>
                        <SelectItem value="eid">Eid Holidays</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={getCrowdPrediction}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Predicting...
                    </>
                  ) : (
                    <>
                      <Users className="w-4 h-4 mr-2" />
                      Predict Crowd Levels
                    </>
                  )}
                </Button>

                {crowdPrediction && (
                  <div className="mt-6 space-y-4">
                    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                      <CardContent className="pt-6">
                        <div className="text-center mb-4">
                          <p className="text-sm text-gray-600 mb-2">Predicted Crowd Level</p>
                          <p className="text-5xl font-bold text-indigo-600 mb-2">
                            {crowdPrediction.predictedCrowdLevel}/10
                          </p>
                          <Badge className="text-lg px-4 py-2">{crowdPrediction.crowdCategory}</Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Base Price</p>
                            <p className="text-2xl font-bold">PKR {crowdPrediction.basePrice.toLocaleString()}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Predicted Price</p>
                            <p className="text-2xl font-bold text-red-600">
                              PKR {crowdPrediction.predictedPrice.toLocaleString()}
                            </p>
                            <Badge variant="destructive" className="mt-1">
                              +{crowdPrediction.priceIncrease}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {crowdPrediction.recommendations.map((rec: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-indigo-500 mt-1">•</span>
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Smart Budget Allocation Tab */}
          <TabsContent value="budget" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Smart Budget Allocation AI</CardTitle>
                <CardDescription>
                  ML-powered budget optimization based on your travel style and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label>Total Budget (PKR)</Label>
                    <Input
                      type="number"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(e.target.value)}
                      min="10000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Duration (days)</Label>
                    <Input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      min="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Travelers</Label>
                    <Input
                      type="number"
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      min="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Travel Style</Label>
                    <Select value={travelStyle} onValueChange={setTravelStyle}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={getBudgetAllocation}
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4 mr-2" />
                      Optimize Budget Allocation
                    </>
                  )}
                </Button>

                {budgetAllocation && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Optimized Budget Plan</h3>
                      <Badge variant="outline">{budgetAllocation.algorithm}</Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="bg-emerald-50 border-emerald-200">
                        <CardContent className="pt-6">
                          <p className="text-sm text-gray-600 mb-1">Per Person Budget</p>
                          <p className="text-2xl font-bold text-emerald-600">
                            PKR {budgetAllocation.perPersonBudget.toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="pt-6">
                          <p className="text-sm text-gray-600 mb-1">Daily Budget</p>
                          <p className="text-2xl font-bold text-blue-600">
                            PKR {budgetAllocation.dailyBudget.toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-purple-50 border-purple-200">
                        <CardContent className="pt-6">
                          <p className="text-sm text-gray-600 mb-1">Strategy</p>
                          <p className="text-2xl font-bold text-purple-600 capitalize">
                            {budgetAllocation.allocationStrategy}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Budget Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(budgetAllocation.breakdown).map(([category, amount]: [string, any]) => (
                            <div key={category}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium capitalize">{category}</span>
                                <span className="text-sm font-semibold">PKR {amount.toLocaleString()}</span>
                              </div>
                              <Progress
                                value={(amount / budgetAllocation.totalBudget) * 100}
                                className="h-2"
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                      <CardHeader>
                        <CardTitle className="text-base">💡 Money-Saving Tips</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {budgetAllocation.savingsTips.map((tip: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-yellow-600 mt-1">💰</span>
                              <span className="text-sm">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ML Performance Metrics Tab */}
          <TabsContent value="metrics" className="mt-6">
            <MLPerformanceMetrics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

