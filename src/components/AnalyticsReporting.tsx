import React, { useState } from 'react';
import { BarChart3, TrendingUp, MapPin, Clock, Users, AlertTriangle, Download, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

export function AnalyticsReporting() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Mock analytics data
  const touristActivityData = [
    { date: 'Sep 11', tourists: 2340, alerts: 12, incidents: 2 },
    { date: 'Sep 12', tourists: 2580, alerts: 8, incidents: 1 },
    { date: 'Sep 13', tourists: 2720, alerts: 15, incidents: 3 },
    { date: 'Sep 14', tourists: 2890, alerts: 6, incidents: 0 },
    { date: 'Sep 15', tourists: 3120, alerts: 18, incidents: 4 },
    { date: 'Sep 16', tourists: 2960, alerts: 11, incidents: 2 },
    { date: 'Sep 17', tourists: 2847, alerts: 9, incidents: 1 }
  ];

  const alertTypeData = [
    { name: 'Distress Alerts', value: 35, color: '#ef4444' },
    { name: 'Anomaly Detection', value: 28, color: '#f97316' },
    { name: 'Restricted Area', value: 20, color: '#eab308' },
    { name: 'Medical Emergency', value: 12, color: '#3b82f6' },
    { name: 'Weather Advisory', value: 5, color: '#6b7280' }
  ];

  const regionData = [
    { region: 'Assam', tourists: 1245, alerts: 15, riskScore: 2.3 },
    { region: 'Meghalaya', tourists: 678, alerts: 8, riskScore: 1.8 },
    { region: 'Manipur', tourists: 432, alerts: 12, riskScore: 3.1 },
    { region: 'Arunachal Pradesh', tourists: 298, alerts: 5, riskScore: 1.2 },
    { region: 'Nagaland', tourists: 156, alerts: 3, riskScore: 1.5 },
    { region: 'Mizoram', tourists: 89, alerts: 2, riskScore: 1.1 }
  ];

  const incidentTrendData = [
    { month: 'Mar', incidents: 28, resolved: 26, avg_response: 12 },
    { month: 'Apr', incidents: 32, resolved: 30, avg_response: 11 },
    { month: 'May', incidents: 25, resolved: 24, avg_response: 10 },
    { month: 'Jun', incidents: 41, resolved: 38, avg_response: 13 },
    { month: 'Jul', incidents: 35, resolved: 33, avg_response: 9 },
    { month: 'Aug', incidents: 29, resolved: 28, avg_response: 8 },
    { month: 'Sep', incidents: 22, resolved: 21, avg_response: 7 }
  ];

  const hotspotData = [
    { location: 'Guwahati City Center', visits: 1456, incidents: 8, risk_level: 'Medium' },
    { location: 'Kaziranga National Park', visits: 892, incidents: 3, risk_level: 'Low' },
    { location: 'Shillong Police Bazaar', visits: 734, incidents: 5, risk_level: 'Medium' },
    { location: 'Tawang Monastery', visits: 567, incidents: 2, risk_level: 'Low' },
    { location: 'Imphal Kangla Fort', visits: 445, incidents: 7, risk_level: 'High' }
  ];

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  const exportReport = () => {
    console.log('Exporting analytics report...');
    // In a real app, this would generate and download a PDF/Excel report
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Analytics & Reporting Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive insights into tourist safety and security patterns</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="assam">Assam</SelectItem>
              <SelectItem value="meghalaya">Meghalaya</SelectItem>
              <SelectItem value="manipur">Manipur</SelectItem>
              <SelectItem value="arunachal">Arunachal Pradesh</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={exportReport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tourists</p>
                <p className="text-2xl font-semibold">2,847</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% from last week
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-semibold">9</p>
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  -25% from yesterday
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-semibold">7.2m</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  -15% improvement
                </p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
                <p className="text-2xl font-semibold">94.8%</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +2.1% this month
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Tourist Activity</TabsTrigger>
          <TabsTrigger value="alerts">Alert Analysis</TabsTrigger>
          <TabsTrigger value="regions">Regional Insights</TabsTrigger>
          <TabsTrigger value="trends">Historical Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Tourist Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={touristActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="tourists" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Tourist Hotspots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {hotspotData.map((spot, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex-1">
                        <p className="font-medium">{spot.location}</p>
                        <p className="text-sm text-muted-foreground">{spot.visits} visits this week</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getRiskColor(spot.risk_level)}>
                          {spot.risk_level}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{spot.incidents} incidents</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={alertTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {alertTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Alert Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={touristActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="alerts" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="incidents" stroke="#f97316" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regional Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regionData.map((region, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded">
                    <div>
                      <p className="font-medium">{region.region}</p>
                      <p className="text-sm text-muted-foreground">Region</p>
                    </div>
                    <div>
                      <p className="font-semibold">{region.tourists.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Active Tourists</p>
                    </div>
                    <div>
                      <p className="font-semibold">{region.alerts}</p>
                      <p className="text-sm text-muted-foreground">Total Alerts</p>
                    </div>
                    <div>
                      <p className="font-semibold">{region.riskScore}</p>
                      <p className="text-sm text-muted-foreground">Risk Score</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incident Resolution Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={incidentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="incidents" fill="#ef4444" name="Total Incidents" />
                  <Bar dataKey="resolved" fill="#22c55e" name="Resolved" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Time Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={incidentTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="avg_response" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      name="Avg Response Time (min)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="font-medium">Monthly Resolution Rate</span>
                  <span className="font-semibold text-green-700">95.5%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="font-medium">Avg Response Time</span>
                  <span className="font-semibold text-blue-700">7.2 minutes</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                  <span className="font-medium">Tourist Satisfaction</span>
                  <span className="font-semibold text-purple-700">4.8/5.0</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                  <span className="font-medium">System Uptime</span>
                  <span className="font-semibold text-orange-700">99.97%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}