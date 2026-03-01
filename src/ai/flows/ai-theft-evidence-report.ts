'use server';
/**
 * @fileOverview A Genkit flow for generating an AI-powered evidence report for electricity theft incidents.
 *
 * - aiTheftEvidenceReport - A function that handles the generation of the theft evidence report.
 * - AiTheftEvidenceReportInput - The input type for the aiTheftEvidenceReport function.
 * - AiTheftEvidenceReportOutput - The return type for the aiTheftEvidenceReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// 1. Define Input Schema
const AiTheftEvidenceReportInputSchema = z.object({
  meterId: z.string().describe('The ID of the smart meter where theft was detected.').default('UNKNOWN'),
  theftPattern: z.string().describe('A description of the detected theft pattern (e.g., "Magnetic interference", "CT bypass", "Illegal sub-metering").'),
  confidenceScore: z.number().min(0).max(100).describe('The AI model\'s confidence score for the theft detection, ranging from 0 to 100.'),
  location: z.object({
    state: z.string().describe('The state where the meter is located.'),
    district: z.string().describe('The district where the meter is located.'),
    lat: z.number().describe('Latitude of the meter location.').optional(),
    lng: z.number().describe('Longitude of the meter location.').optional()
  }).describe('Geographical location details of the detected theft.'),
  detectedAt: z.string().datetime().describe('ISO 8601 timestamp when the theft was detected.'),
  sensorDataAnomalies: z.array(z.object({
    sensorName: z.string().describe('The name of the sensor that recorded an anomaly (e.g., "Phase A Current", "Winding Temperature").'),
    actualReading: z.string().describe('The actual anomalous reading recorded by the sensor (e.g., "0 A", "250 V", "10%").'),
    expectedRange: z.string().describe('The normal or expected operating range for the sensor (e.g., "5-10 A", "220-240 V", "90-100%").'),
    deviation: z.string().describe('A brief description of how the actual reading deviates from the expected range (e.g., "Unexpectedly low", "Abnormally high", "Sudden drop").')
  })).describe('An array of relevant sensor data anomalies that support the theft detection.')
});
export type AiTheftEvidenceReportInput = z.infer<typeof AiTheftEvidenceReportInputSchema>;

// 2. Define Output Schema
const AiTheftEvidenceReportOutputSchema = z.object({
  reportTitle: z.string().describe('A clear and concise title for the theft evidence report.'),
  summary: z.string().describe('A brief summary of the detected theft incident, including the pattern, confidence, and location.'),
  theftDetails: z.object({
    pattern: z.string().describe('The specific theft pattern identified.'),
    confidenceScore: z.number().describe('The AI confidence score for this detection.'),
    detectedAt: z.string().datetime().describe('The timestamp of detection.'),
    location: z.string().describe('A human-readable location string (e.g., "Pune, Maharashtra").')
  }).describe('Key details of the theft incident.'),
  anomalies: z.array(z.object({
    sensorName: z.string().describe('Name of the sensor.'),
    anomalyDescription: z.string().describe('Description of the anomalous reading and its deviation from expected.')
  })).describe('A list of summarized sensor data anomalies that serve as evidence.'),
  potentialImpact: z.string().describe('Description of the potential impact (e.g., estimated energy loss, revenue loss).'),
  recommendedActions: z.array(z.string()).describe('A list of immediate recommended actions for the field crew.'),
  isCritical: z.boolean().describe('True if the detected theft is considered critical and requires immediate dispatch.')
});
export type AiTheftEvidenceReportOutput = z.infer<typeof AiTheftEvidenceReportOutputSchema>;

// 3. Define the Prompt
const generateEvidenceReportPrompt = ai.definePrompt({
  name: 'generateTheftEvidenceReportPrompt',
  input: { schema: AiTheftEvidenceReportInputSchema },
  output: { schema: AiTheftEvidenceReportOutputSchema },
  prompt: `You are an AI-powered electricity theft analysis engine, designed to generate clear, concise, and actionable evidence reports for DISCOM engineers.
Your goal is to summarize a detected theft incident, highlighting the pattern, confidence, and supporting sensor data anomalies, and provide recommendations.

Here is the detected theft incident data:
Meter ID: {{{meterId}}}
Detected Theft Pattern: {{{theftPattern}}}
Confidence Score: {{{confidenceScore}}}%
Location: {{{location.district}}}, {{{location.state}}} {{#if location.lat}}(Lat: {{{location.lat}}}, Lng: {{{location.lng}}}){{/if}}
Detected At: {{{detectedAt}}}

Sensor Data Anomalies (evidence):
{{#each sensorDataAnomalies}}
- Sensor Name: {{{this.sensorName}}}
  Actual Reading: {{{this.actualReading}}}
  Expected Range: {{{this.expectedRange}}}
  Deviation: {{{this.deviation}}}
{{/each}}

Based on this information, generate a comprehensive theft evidence report in the specified JSON format.
Ensure the report is structured to provide all necessary details for a DISCOM engineer to understand the incident and take appropriate action.

Consider the theft critical if the confidence score is above 95% AND the theft pattern is 'CT bypass', 'Magnetic interference', or 'Illegal sub-metering'.
Estimate potential impact based on the nature of the theft pattern. For example, 'CT bypass' implies significant energy loss, while 'Hardware Tampering' suggests a moderate loss. If the pattern is not specifically mentioned, assume moderate impact.
Recommendations should be specific to the detected pattern and should always include 