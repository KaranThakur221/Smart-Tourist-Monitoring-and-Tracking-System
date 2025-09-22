import React, { useState } from 'react';
import { Shield, Search, MapPin, Clock, CheckCircle, XCircle, User, Phone, Camera, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';

export function TouristVerification() {
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Mock tourist data for verification
  const mockTouristData = {
    id: 'T-2847',
    verificationStatus: 'verified',
    identity: {
      name: 'John Smith',
      nationality: 'United States',
      passportNumber: 'US123456789',
      verificationLevel: 'Level 2 - Government Issued ID',
      issuedBy: 'US State Department',
      expiryDate: '2028-03-15',
      verificationHash: 'sha256:a7b2c3d4e5f6...'
    },
    location: {
      current: 'Hotel Brahmaputra Ashok, Guwahati',
      coordinates: '26.1445° N, 91.7362° E',
      lastUpdate: '2024-09-17 14:32:15',
      accuracy: '±5 meters',
      movementHistory: [
        { location: 'Guwahati Airport', time: '2024-09-17 09:30:00' },
        { location: 'Hotel Brahmaputra Ashok', time: '2024-09-17 10:45:00' },
        { location: 'Kamakhya Temple', time: '2024-09-17 12:15:00' },
        { location: 'Hotel Brahmaputra Ashok', time: '2024-09-17 14:30:00' }
      ]
    },
    emergency: {
      emergencyContact: '+1-555-0123',
      medicalInfo: 'No known allergies',
      travelInsurance: 'Global Travel Insurance - Policy #GTI789012',
      groupSize: 1,
      plannedDuration: '7 days'
    },
    verification: {
      requestedBy: 'Officer J. Singh',
      requestTime: '2024-09-17 14:35:00',
      reason: 'Routine Security Check',
      approvalStatus: 'Pending Tourist Consent',
      dataShared: ['identity', 'location', 'emergency_contact']
    }
  };

  const handleVerificationRequest = async () => {
    if (!searchQuery.trim()) return;
    
    setIsVerifying(true);
    // Simulate API call delay
    setTimeout(() => {
      setVerificationResult(mockTouristData);
      setIsVerifying(false);
    }, 2000);
  };

  const handleDataRequest = (dataType: string) => {
    console.log(`Requesting ${dataType} data from tourist ${verificationResult?.id}`);
    // In a real app, this would send a request to the tourist's mobile app
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Tourist Verification Center</h2>
          <p className="text-muted-foreground">Securely verify tourist credentials and location during emergencies</p>
        </div>
      </div>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Request Tourist Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Tourist ID or Phone Number</Label>
              <Input
                id="search"
                placeholder="Enter Tourist ID (T-XXXX) or Phone"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason">Verification Reason</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency Response</SelectItem>
                  <SelectItem value="routine">Routine Security Check</SelectItem>
                  <SelectItem value="incident">Incident Investigation</SelectItem>
                  <SelectItem value="medical">Medical Emergency</SelectItem>
                  <SelectItem value="assistance">Tourist Assistance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="data-type">Data Requested</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Identity Only</SelectItem>
                  <SelectItem value="location">Identity + Location</SelectItem>
                  <SelectItem value="emergency">Emergency Data Package</SelectItem>
                  <SelectItem value="full">Full Verification (Emergency Only)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleVerificationRequest} 
            disabled={!searchQuery.trim() || isVerifying}
            className="w-full md:w-auto"
          >
            {isVerifying ? (
              <>
                <Shield className="w-4 h-4 mr-2 animate-spin" />
                Sending Verification Request...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Request Verification
              </>
            )}
          </Button>
          
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              All verification requests are sent to the tourist's mobile app for consent. 
              Only cryptographically verified data is displayed. No personal data is stored centrally.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Verification Results */}
      {verificationResult && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Verification Results</h3>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
              <Badge variant="secondary">
                Level 2 Authentication
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="identity" className="space-y-4">
            <TabsList>
              <TabsTrigger value="identity">Identity Verification</TabsTrigger>
              <TabsTrigger value="location">Location Data</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Info</TabsTrigger>
              <TabsTrigger value="requests">Data Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="identity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Verified Identity Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Tourist ID</Label>
                      <p className="font-mono">{verificationResult.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Verification Status</Label>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="capitalize">{verificationResult.verificationStatus}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                      <p>{verificationResult.identity.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Nationality</Label>
                      <p>{verificationResult.identity.nationality}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Document Number</Label>
                      <p className="font-mono">{verificationResult.identity.passportNumber}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Verification Level</Label>
                      <p>{verificationResult.identity.verificationLevel}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Issued By</Label>
                      <p>{verificationResult.identity.issuedBy}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Expiry Date</Label>
                      <p>{verificationResult.identity.expiryDate}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Label className="text-sm font-medium text-muted-foreground">Cryptographic Hash</Label>
                    <p className="font-mono text-sm text-muted-foreground break-all">
                      {verificationResult.identity.verificationHash}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      This hash verifies the authenticity of the presented credentials without exposing raw data.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Current Location & Movement History
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Current Location</Label>
                      <p>{verificationResult.location.current}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Coordinates</Label>
                      <p className="font-mono">{verificationResult.location.coordinates}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Last Update</Label>
                      <p>{verificationResult.location.lastUpdate}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Accuracy</Label>
                      <p>{verificationResult.location.accuracy}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-muted-foreground">Recent Movement History</Label>
                    <div className="space-y-2">
                      {verificationResult.location.movementHistory.map((movement: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="font-medium">{movement.location}</p>
                            <p className="text-sm text-muted-foreground">{movement.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Emergency Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Emergency Contact</Label>
                      <p className="font-mono">{verificationResult.emergency.emergencyContact}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Medical Information</Label>
                      <p>{verificationResult.emergency.medicalInfo}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Travel Insurance</Label>
                      <p>{verificationResult.emergency.travelInsurance}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Group Size</Label>
                      <p>{verificationResult.emergency.groupSize} person(s)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Data Request Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Requested By</Label>
                      <p>{verificationResult.verification.requestedBy}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Request Time</Label>
                      <p>{verificationResult.verification.requestTime}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Reason</Label>
                      <p>{verificationResult.verification.reason}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Approval Status</Label>
                      <Badge variant="secondary">{verificationResult.verification.approvalStatus}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-muted-foreground">Available Actions</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDataRequest('additional_identity')}
                      >
                        Request Additional ID
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDataRequest('travel_documents')}
                      >
                        Request Travel Documents
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDataRequest('contact_verification')}
                      >
                        Verify Emergency Contact
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDataRequest('location_history')}
                      >
                        Extended Location History
                      </Button>
                    </div>
                  </div>

                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Each additional data request requires separate tourist consent and is logged for audit purposes.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}