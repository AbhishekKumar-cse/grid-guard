import { addDays, subDays, subHours } from 'date-fns';

export const MOCK_DISCOMS = [
  { id: 'UPPCL', name: 'UP Power Corp', state: 'Uttar Pradesh', region: 'North', atcLoss: 30.2, atcLossTrend: 0.5, smartMeterCoverage: 45, totalConsumers: 28000000, revenueCollected: 12400, activeAlerts: 14 },
  { id: 'JVVNL', name: 'Jaipur Vidyut', state: 'Rajasthan', region: 'West', atcLoss: 26.8, atcLossTrend: -0.2, smartMeterCoverage: 52, totalConsumers: 15000000, revenueCollected: 8200, activeAlerts: 8 },
  { id: 'MSEDCL', name: 'MAHAVITARAN', state: 'Maharashtra', region: 'West', atcLoss: 14.1, atcLossTrend: -1.1, smartMeterCoverage: 68, totalConsumers: 24000000, revenueCollected: 18500, activeAlerts: 5 },
  { id: 'BESCOM', name: 'Bangalore Electricity', state: 'Karnataka', region: 'South', atcLoss: 12.5, atcLossTrend: -0.4, smartMeterCoverage: 75, totalConsumers: 12000000, revenueCollected: 9400, activeAlerts: 3 },
  { id: 'TNEB', name: 'Tamil Nadu EB', state: 'Tamil Nadu', region: 'South', atcLoss: 15.2, atcLossTrend: 0.1, smartMeterCoverage: 62, totalConsumers: 19000000, revenueCollected: 11200, activeAlerts: 6 },
  { id: 'WBSEDCL', name: 'WB State Electricity', state: 'West Bengal', region: 'East', atcLoss: 18.4, atcLossTrend: -0.3, smartMeterCoverage: 58, totalConsumers: 14000000, revenueCollected: 7600, activeAlerts: 4 },
  { id: 'GUVNL', name: 'Gujarat Urja', state: 'Gujarat', region: 'West', atcLoss: 9.8, atcLossTrend: -0.8, smartMeterCoverage: 88, totalConsumers: 16000000, revenueCollected: 14200, activeAlerts: 2 },
];

export const MOCK_ALERTS = [
  { id: 'ALT-001', type: 'theft', severity: 'critical', title: 'Potential CT Bypass Detected', location: { state: 'Maharashtra', district: 'Pune', lat: 18.5204, lng: 73.8567 }, meterId: 'MH-PNE-4821', confidence: 97.4, detectedAt: subHours(new Date(), 2).toISOString(), status: 'detected' },
  { id: 'ALT-002', type: 'fault', severity: 'high', title: 'Phase Unbalance Alert', location: { state: 'Gujarat', district: 'Ahmedabad', lat: 23.0225, lng: 72.5714 }, transformerId: 'TR-GJ-9023', detectedAt: subHours(new Date(), 4).toISOString(), status: 'investigating' },
  { id: 'ALT-003', type: 'maintenance', severity: 'medium', title: 'High Winding Temp Warning', location: { state: 'Karnataka', district: 'Bangalore', lat: 12.9716, lng: 77.5946 }, transformerId: 'TR-KA-1122', detectedAt: subHours(new Date(), 6).toISOString(), status: 'detected' },
  { id: 'ALT-004', type: 'theft', severity: 'critical', title: 'Magnetic Interference Detected', location: { state: 'Uttar Pradesh', district: 'Lucknow', lat: 26.8467, lng: 80.9462 }, meterId: 'UP-LKO-9912', confidence: 94.1, detectedAt: subHours(new Date(), 1).toISOString(), status: 'detected' },
];

export const MOCK_TRANSFORMERS = [
  { id: 'TR-MH-4421', location: { state: 'Maharashtra', district: 'Pune' }, capacity: 10, healthIndex: 42, sensors: { windingTemp: 88, oilTemp: 76, ambientTemp: 34, vibration: 2.8, oilLevel: 68 }, status: 'critical', predictedFailureDate: addDays(new Date(), 14).toISOString() },
  { id: 'TR-GJ-9023', location: { state: 'Gujarat', district: 'Surat' }, capacity: 25, healthIndex: 78, sensors: { windingTemp: 65, oilTemp: 58, ambientTemp: 32, vibration: 1.2, oilLevel: 92 }, status: 'warning', predictedFailureDate: null },
  { id: 'TR-KA-1122', location: { state: 'Karnataka', district: 'Mysore' }, capacity: 15, healthIndex: 94, sensors: { windingTemp: 52, oilTemp: 48, ambientTemp: 28, vibration: 0.8, oilLevel: 98 }, status: 'healthy', predictedFailureDate: null },
];

export const MOCK_CHART_DATA = {
  atcLossHistory: Array.from({ length: 24 }, (_, i) => ({ time: `${i}:00`, value: 17.4 + (Math.random() * 2 - 1) })),
  nationalTrend: [
    { year: 2000, value: 38.5 },
    { year: 2005, value: 34.2 },
    { year: 2010, value: 28.6 },
    { year: 2015, value: 24.8 },
    { year: 2020, value: 20.3 },
    { year: 2023, value: 17.4 },
    { year: 2025, value: 12.0, projected: true },
    { year: 2027, value: 6.0, projected: true },
    { year: 2030, value: 1.8, projected: true },
  ]
};
