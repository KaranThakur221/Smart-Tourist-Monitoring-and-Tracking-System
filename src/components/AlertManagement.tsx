import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin, User, Phone, CheckCircle, XCircle, Eye, MoreHorizontal, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface Alert {
  id: number;
  type: string;
  location: string;
  severity: string;
  time: string;
}

interface AlertManagementProps {
  alerts: Alert[];
}

export function AlertManagement({ alerts: initialAlerts }: AlertManagementProps) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  // Extended alert data for demonstration
  const extendedAlerts = [
    {
      id: 1,
      type: 'distress',
      title: 'Panic Button Activated',
      location: 'Guwahati City Center',
      coordinates: '26.1445° N, 91.7362° E',
      severity: 'high',
      status: 'active',
      time: '2 min ago',
      timestamp: '2024-09-17 14:32:15',
      tourist: { id: 'T-2847', name: 'Anonymous Tourist', contact: '+91-XXXX-XX7890' },
      description: 'Tourist activated panic button. Last known location: Hotel Brahmaputra Ashok',
      responder: null,
      estimatedResponse: '8 minutes'
    },
    {
      id: 2,
      type: 'anomaly',
      title: 'Unusual Movement Pattern',
      location: 'Shillong Police Bazaar',
      coordinates: '25.5788° N, 91.8933° E',
      severity: 'medium',
      status: 'investigating',
      time: '5 min ago',
      timestamp: '2024-09-17 14:29:45',
      tourist: { id: 'T-3156', name: 'Anonymous Tourist', contact: '+91-XXXX-XX9012' },
      description: 'Tourist has been stationary for 45 minutes in non-tourist area',
      responder: 'Officer R. Sharma',
      estimatedResponse: 'In progress'
    },
    {
      id: 3,
      type: 'restricted',
      title: 'Restricted Area Entry',
      location: 'Border Area - Dawki',
      coordinates: '25.1167° N, 91.7667° E',
      severity: 'high',
      status: 'resolved',
      time: '12 min ago',
      timestamp: '2024-09-17 14:22:30',
      tourist: { id: 'T-4201', name: 'Anonymous Tourist', contact: '+91-XXXX-XX3456' },
      description: 'Tourist attempted to enter restricted border zone',
      responder: 'Border Security Team Alpha',
      estimatedResponse: 'Completed'
    },
    {
      id: 4,
      type: 'medical',
      title: 'Medical Emergency',
      location: 'Kaziranga National Park',
      coordinates: '26.5775° N, 93.1713° E',
      severity: 'high',
      status: 'responding',
      time: '18 min ago',
      timestamp: '2024-09-17 14:16:45',
      tourist: { id: 'T-1892', name: 'Anonymous Tourist', contact: '+91-XXXX-XX5678' },
      description: 'Tourist reported feeling unwell during safari tour',
      responder: 'Ambulance Unit 3',
      estimatedResponse: '6 minutes'
    },
    {
      id: 5,
      type: 'weather',
      title: 'Weather Advisory',
      location: 'Tawang Monastery Area',
      coordinates: '27.5856° N, 91.8581° E',
      severity: 'low',
      status: 'monitoring',
      time: '1 hour ago',
      timestamp: '2024-09-17 13:32:15',
      tourist: { id: 'Multiple', name: 'Group Alert', contact: 'N/A' },
      description: 'Heavy rainfall warning issued for the region',
      responder: 'Weather Monitoring Team',
      estimatedResponse: 'Ongoing'
    }
  ];

  const filteredAlerts = extendedAlerts.filter(alert => {
    const matchesFilter = filter === 'all' || alert.severity === filter || alert.status === filter;
    const matchesSearch = alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'destructive';
      case 'investigating': return 'secondary';
      case 'responding': return 'default';
      case 'resolved': return 'outline';
      case 'monitoring': return 'secondary';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'distress': return <AlertTriangle className="w-4 h-4" />;
      case 'medical': return <User className="w-4 h-4" />;
      case 'weather': return <Clock className="w-4 h-4" />;
      case 'restricted': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const handleAssignResponder = (alertId: number, responder: string) => {
    console.log(`Assigning ${responder} to alert ${alertId}`);
  };

  const handleStatusChange = (alertId: number, newStatus: string) => {
    console.log(`Changing alert ${alertId} status to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Alert Management Center</h2>
          <p className="text-muted-foreground">Monitor and respond to security alerts across the region</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter alerts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Alerts</SelectItem>
              <SelectItem value="high">High Severity</SelectItem>
              <SelectItem value="medium">Medium Severity</SelectItem>
              <SelectItem value="low">Low Severity</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="investigating">Under Investigation</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-semibold text-destructive">
                  {extendedAlerts.filter(a => a.status === 'active').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Investigating</p>
                <p className="text-2xl font-semibold text-yellow-600">
                  {extendedAlerts.filter(a => a.status === 'investigating').length}
                </p>
              </div>
              <Eye className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Responding</p>
                <p className="text-2xl font-semibold text-blue-600">
                  {extendedAlerts.filter(a => a.status === 'responding').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-semibold text-green-600">
                  {extendedAlerts.filter(a => a.status === 'resolved').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Tourist ID</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id} className={alert.severity === 'high' ? 'bg-destructive/5' : ''}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(alert.type)}
                      <span className="capitalize">{alert.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        {alert.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{alert.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">{alert.tourist.id}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{alert.time}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedAlert(alert)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Alert Details - {alert.title}</DialogTitle>
                          </DialogHeader>
                          {selectedAlert && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Type</label>
                                  <p className="capitalize">{selectedAlert.type}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Severity</label>
                                  <p>
                                    <Badge variant={getSeverityColor(selectedAlert.severity)}>
                                      {selectedAlert.severity}
                                    </Badge>
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Location</label>
                                  <p>{selectedAlert.location}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Coordinates</label>
                                  <p className="font-mono text-sm">{selectedAlert.coordinates}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Tourist ID</label>
                                  <p className="font-mono">{selectedAlert.tourist.id}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Contact</label>
                                  <p className="font-mono">{selectedAlert.tourist.contact}</p>
                                </div>
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium">Description</label>
                                <p className="mt-1">{selectedAlert.description}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Current Responder</label>
                                  <p>{selectedAlert.responder || 'Not assigned'}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">ETA</label>
                                  <p>{selectedAlert.estimatedResponse}</p>
                                </div>
                              </div>
                              
                              <div className="flex gap-2 pt-4">
                                <Button size="sm" variant="outline">
                                  Assign Responder
                                </Button>
                                <Button size="sm" variant="outline">
                                  Update Status
                                </Button>
                                <Button size="sm">
                                  Contact Tourist
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleAssignResponder(alert.id, 'Officer A')}>
                            Assign Responder
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(alert.id, 'investigating')}>
                            Mark as Investigating
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(alert.id, 'resolved')}>
                            Mark as Resolved
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Send to Emergency Services
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}