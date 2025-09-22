import React, { useState } from 'react';
import { MapPin, AlertTriangle, Users, BarChart3, Settings, Shield, Bell } from 'lucide-react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { DashboardMap } from './components/DashboardMap';
import { AlertManagement } from './components/AlertManagement';
import { TouristVerification } from './components/TouristVerification';
import { AnalyticsReporting } from './components/AnalyticsReporting';
import { LoginScreen } from './components/LoginScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [alerts] = useState([
    { id: 1, type: 'distress', location: 'Guwahati', severity: 'high', time: '2 min ago' },
    { id: 2, type: 'anomaly', location: 'Shillong', severity: 'medium', time: '5 min ago' },
    { id: 3, type: 'restricted', location: 'Imphal', severity: 'low', time: '12 min ago' }
  ]);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Main Dashboard', icon: MapPin },
    { id: 'alerts', label: 'Alert Management', icon: AlertTriangle },
    { id: 'verification', label: 'Tourist Verification', icon: Shield },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 }
  ];

  const highSeverityAlerts = alerts.filter(alert => alert.severity === 'high').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-semibold">Smart Tourist Safety Dashboard</h1>
                <p className="text-sm text-muted-foreground">Northeast India Tourism & Security</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {highSeverityAlerts > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                  {highSeverityAlerts}
                </Badge>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              <p className="font-medium">Officer J. Singh</p>
              <p className="text-muted-foreground">Tourism Dept.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-card border-r border-border p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeView === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveView(item.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                  {item.id === 'alerts' && highSeverityAlerts > 0 && (
                    <Badge className="ml-auto bg-destructive text-destructive-foreground">
                      {highSeverityAlerts}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-8">
            <h3 className="font-medium mb-4">Quick Overview</h3>
            <div className="space-y-3">
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Tourists</p>
                    <p className="text-xl font-semibold">2,847</p>
                  </div>
                  <Users className="h-8 w-8 text-chart-1" />
                </div>
              </Card>
              
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Alerts</p>
                    <p className="text-xl font-semibold">{alerts.length}</p>
                  </div>
                  <AlertTriangle className={`h-8 w-8 ${highSeverityAlerts > 0 ? 'text-destructive' : 'text-chart-2'}`} />
                </div>
              </Card>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeView === 'dashboard' && <DashboardMap alerts={alerts} />}
          {activeView === 'alerts' && <AlertManagement alerts={alerts} />}
          {activeView === 'verification' && <TouristVerification />}
          {activeView === 'analytics' && <AnalyticsReporting />}
        </main>
      </div>
    </div>
  );
}