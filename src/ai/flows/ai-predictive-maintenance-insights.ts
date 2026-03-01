'use server';
/**
 * @fileOverview An AI agent that provides insights into predicted asset failures for maintenance prioritization.
 *
 * - aiPredictiveMaintenanceInsights - A function that generates AI insights for a transformer's predicted failure.
 * - AIPredictiveMaintenanceInsightsInput - The input type for the aiPredictiveMaintenanceInsights function.
 * - AIPredictiveMaintenanceInsightsOutput - The return type for the aiPredictiveMaintenanceInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIPredictiveMaintenanceInsightsInputSchema = z.object({
  transformerId: z.string().describe('The unique identifier of the transformer.'),
  healthIndex: z.number().min(0).max(100).describe('The current health index of the transformer (0-100).'),
  sensorReadings: z.object({
    windingTemp: z.number().describe('Current winding temperature in Celsius.'),
    oilTemp: z.number().describe('Current oil temperature in Celsius.'),
    ambientTemp: z.number().describe('Current ambient temperature in Celsius.'),
    phaseACurrent: z.number().describe('Current in Phase A in Amperes.'),
    phaseBCurrent: z.number().describe('Current in Phase B in Amperes.'),
    phaseCCurrent: z.number().describe('Current in Phase C in Amperes.'),
    vibration: z.number().describe('Vibration level in mm/s.'),
    oilLevel: z.number().min(0).max(100).describe('Oil level percentage.'),
    oilMoisture: z.number().describe('Oil moisture content in ppm.'),
  }).describe('Latest sensor readings for the transformer.'),
  predictedFailureDate: z.string().datetime().nullable().describe('The predicted date of failure, if available. Format: ISO 8601 string.'),
  lastMaintenance: z.string().datetime().nullable().describe('The date of the last maintenance, if available. Format: ISO 8601 string.')
});
export type AIPredictiveMaintenanceInsightsInput = z.infer<typeof AIPredictiveMaintenanceInsightsInputSchema>;

const AIPredictiveMaintenanceInsightsOutputSchema = z.object({
  failureMode: z.string().describe('A natural language explanation of the predicted failure mode.'),
  likelihood: z.string().describe('The likelihood of the predicted failure, e.g., "High", "Medium", "Low", or a percentage.'),
  recommendedActions: z.array(z.string()).describe('A list of recommended preemptive actions to prevent the failure.'),
  severity: z.enum(['critical', 'high', 'medium', 'low']).describe('The severity of the predicted failure.'),
});
export type AIPredictiveMaintenanceInsightsOutput = z.infer<typeof AIPredictiveMaintenanceInsightsOutputSchema>;

export async function aiPredictiveMaintenanceInsights(input: AIPredictiveMaintenanceInsightsInput): Promise<AIPredictiveMaintenanceInsightsOutput> {
  return aiPredictiveMaintenanceInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictiveMaintenanceInsightsPrompt',
  input: { schema: AIPredictiveMaintenanceInsightsInputSchema },
  output: { schema: AIPredictiveMaintenanceInsightsOutputSchema },
  prompt: `You are an expert in power grid asset maintenance and predictive analytics.
Your task is to analyze the provided transformer data and generate insights regarding potential failures.

Analyze the following information for transformer ID: {{{transformerId}}}

- Current Health Index: {{{healthIndex}}} (0-100, lower is worse)
- Latest Sensor Readings:
  - Winding Temperature: {{{sensorReadings.windingTemp}}}°C
  - Oil Temperature: {{{sensorReadings.oilTemp}}}°C
  - Ambient Temperature: {{{sensorReadings.ambientTemp}}}°C
  - Phase A Current: {{{sensorReadings.phaseACurrent}}}A
  - Phase B Current: {{{sensorReadings.phaseBCurrent}}}A
  - Phase C Current: {{{sensorReadings.phaseCCurrent}}}A
  - Vibration: {{{sensorReadings.vibration}}} mm/s
  - Oil Level: {{{sensorReadings.oilLevel}}}%
  - Oil Moisture: {{{sensorReadings.oilMoisture}}} ppm
- Predicted Failure Date: {{{predictedFailureDate}}}
- Last Maintenance Date: {{{lastMaintenance}}}

Based on this data, provide a natural language explanation of the predicted failure mode, its likelihood, and specific recommended preemptive actions. Also, assign a severity level.

Consider thresholds:
- Winding/Oil Temp > 85°C: Critical
- Vibration > 2.5 mm/s: High
- Oil Level < 70%: Medium
- Oil Moisture > 50 ppm: Medium
- Health Index < 60: Critical failure imminent
- Health Index < 80: High risk of failure

If the predicted failure date is in the near future (e.g., within 30-90 days) and the health index is low, increase the likelihood and severity.

Example Output Structure (ensure JSON only):
{
  "failureMode": "Explanation of potential failure, e.g., 'Overheating of windings leading to insulation breakdown.'",
  "likelihood": "e.g., 'Very High (95%)' or 'Medium (60%)'",
  "recommendedActions": [
    "Action 1, e.g., 'Schedule immediate inspection of cooling system.'",
    "Action 2, e.g., 'Test dielectric strength of transformer oil.'"
  ],
  "severity": "critical" // or 'high', 'medium', 'low'
}

If no immediate failure is predicted and all readings are normal, state that the asset is healthy.
`,
});

const aiPredictiveMaintenanceInsightsFlow = ai.defineFlow(
  {
    name: 'aiPredictiveMaintenanceInsightsFlow',
    inputSchema: AIPredictiveMaintenanceInsightsInputSchema,
    outputSchema: AIPredictiveMaintenanceInsightsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
