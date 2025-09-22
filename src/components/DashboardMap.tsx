import React, { useState } from 'react';
import { MapPin, Users, AlertTriangle, Eye, Zap, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Alert {
  id: number;
  type: string;
  location: string;
  severity: string;
  time: string;
}

interface DashboardMapProps {
  alerts: Alert[];
}

export function DashboardMap({ alerts }: DashboardMapProps) {
  const [mapView, setMapView] = useState('heatmap');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Mock tourist cluster data
  const touristClusters = [
    { id: 1, location: 'Guwahati City Center', count: 342, risk: 'low', coords: { x: 45, y: 35 } },
    { id: 2, location: 'Kaziranga National Park', count: 128, risk: 'medium', coords: { x: 65, y: 40 } },
    { id: 3, location: 'Shillong Hills', count: 89, risk: 'low', coords: { x: 35, y: 25 } },
    { id: 4, location: 'Imphal Market Area', count: 156, risk: 'high', coords: { x: 75, y: 60 } },
    { id: 5, location: 'Tawang Monastery', count: 67, risk: 'medium', coords: { x: 85, y: 15 } }
  ];

  const riskZones = [
    { id: 1, name: 'Border Area Alpha', type: 'restricted', severity: 'high', coords: { x: 20, y: 70, width: 15, height: 10 } },
    { id: 2, name: 'Protest Zone Beta', type: 'temporary', severity: 'medium', coords: { x: 60, y: 25, width: 12, height: 8 } }
  ];

  const getClusterColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Real-Time Regional Overview</h2>
          <p className="text-muted-foreground">Live tourist activity and security monitoring</p>
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
          
          <Tabs value={mapView} onValueChange={setMapView}>
            <TabsList>
              <TabsTrigger value="heatmap">Heat Map</TabsTrigger>
              <TabsTrigger value="alerts">Alerts View</TabsTrigger>
              <TabsTrigger value="routes">Routes</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Map Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardContent className="p-6 h-full">
              <div className="relative w-full h-full bg-slate-50 rounded-lg overflow-hidden border-2 border-border">
                {/* Mock Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                  {/* Map Grid */}
                  <div className="absolute inset-0 opacity-20">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="border-b border-gray-300" style={{ top: `${i * 10}%`, height: '1px', width: '100%', position: 'absolute' }} />
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="border-r border-gray-300" style={{ left: `${i * 10}%`, width: '1px', height: '100%', position: 'absolute' }} />
                    ))}
                  </div>

                  {/* Geographic Features */}
                  <div className="absolute top-1/4 left-1/4 w-16 h-12 bg-green-300 rounded-lg opacity-60" title="Kaziranga Forest" />
                  <div className="absolute top-1/6 right-1/4 w-20 h-8 bg-blue-300 rounded-full opacity-60" title="Brahmaputra River" />
                  <div className="absolute bottom-1/3 left-1/3 w-12 h-16 bg-brown-300 rounded-lg opacity-60" title="Hills" />

                  {/* Tourist Clusters */}
                  {mapView === 'heatmap' && touristClusters.map((cluster) => (
                    <div
                      key={cluster.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{ left: `${cluster.coords.x}%`, top: `${cluster.coords.y}%` }}
                    >
                      <div className={`w-8 h-8 rounded-full ${getClusterColor(cluster.risk)} opacity-70 pulse animate-pulse`} />
                      <div className={`w-12 h-12 rounded-full ${getClusterColor(cluster.risk)} opacity-30 absolute -top-2 -left-2`} />
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white rounded p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                        <p className="font-medium">{cluster.location}</p>
                        <p className="text-sm text-muted-foreground">{cluster.count} tourists</p>
                        <p className="text-sm">Risk: {cluster.risk}</p>
                      </div>
                    </div>
                  ))}

                  {/* Risk Zones */}
                  {riskZones.map((zone) => (
                    <div
                      key={zone.id}
                      className="absolute border-2 border-red-500 bg-red-500 bg-opacity-20 rounded cursor-pointer group"
                      style={{
                        left: `${zone.coords.x}%`,
                        top: `${zone.coords.y}%`,
                        width: `${zone.coords.width}%`,
                        height: `${zone.coords.height}%`
                      }}
                    >
                      <div className="absolute -top-8 left-0 bg-red-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {zone.name} - {zone.type}
                      </div>
                    </div>
                  ))}

                  {/* Active Alerts on Map */}
                  {mapView === 'alerts' && alerts.map((alert, index) => (
                    <div
                      key={alert.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{ left: `${30 + index * 15}%`, top: `${40 + index * 10}%` }}
                    >
                      <div className={`w-6 h-6 rounded-full ${getAlertColor(alert.severity)} animate-bounce`}>
                        <AlertTriangle className="w-4 h-4 text-white m-1" />
                      </div>
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white rounded p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                        <p className="font-medium">{alert.type} Alert</p>
                        <p className="text-sm text-muted-foreground">{alert.location}</p>
                        <p className="text-sm">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded p-3 shadow-lg">
                  <h4 className="font-medium mb-2">Legend</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span>Low Risk Area</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span>Medium Risk Area</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      <span>High Risk Area</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-red-500" />
                      <span>Restricted Zone</span>
                    </div>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Button size="sm" variant="outline" className="bg-white">
                    <Navigation className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white">
                    <Zap className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Live Statistics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Live Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Active Tourists</span>
                </div>
                <span className="font-semibold">2,847</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Tourist Clusters</span>
                </div>
                <span className="font-semibold">{touristClusters.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Active Alerts</span>
                </div>
                <span className="font-semibold">{alerts.length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Active Clusters */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Top Tourist Clusters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {touristClusters.slice(0, 4).map((cluster) => (
                <div key={cluster.id} className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <p className="font-medium text-sm">{cluster.location}</p>
                    <p className="text-xs text-muted-foreground">{cluster.count} tourists</p>
                  </div>
                  <Badge variant={cluster.risk === 'high' ? 'destructive' : cluster.risk === 'medium' ? 'secondary' : 'default'}>
                    {cluster.risk}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="p-2 rounded border border-destructive/20 bg-destructive/5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm capitalize">{alert.type}</p>
                    <Badge variant="destructive" className="text-xs">
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.location}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}