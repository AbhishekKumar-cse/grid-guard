'use server';
/**
 * @fileOverview A Genkit flow for generating narrative summaries of grid performance reports.
 *
 * - summarizeGridReports - A function that orchestrates the summarization process.
 * - SummarizeGridReportsInput - The input type for the summarizeGridReports function.
 * - SummarizeGridReportsOutput - The return type for the summarizeGridReports function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeGridReportsInputSchema = z.object({
  reportTitle: z.string().describe('The title of the grid performance report.'),
  reportContent: z
    .string()
    .describe('The full content of the grid performance report, which can be raw data, text, or a JSON string.'),
  context:
    z.string().optional().describe('Optional additional context or specific questions to guide the summary, e.g., "Focus on financial impact" or "What are the main drivers for improvement?"'),
});
export type SummarizeGridReportsInput = z.infer<typeof SummarizeGridReportsInputSchema>;

const SummarizeGridReportsOutputSchema = z.object({
  narrativeSummary: z
    .string()
    .describe('A concise narrative summary of the report, highlighting key insights.'),
  keyTrends: z.array(z.string()).describe('A list of significant trends identified in the report.'),
  significantAnomalies: z.array(z.string()).describe('A list of critical anomalies or outliers observed.'),
  performanceDrivers: z
    .array(z.string())
    .describe('A list of critical factors driving the grid performance, both positive and negative.'),
  recommendations: z
    .array(z.string())
    .optional()
    .describe('Optional recommendations based on the report findings.'),
});
export type SummarizeGridReportsOutput = z.infer<typeof SummarizeGridReportsOutputSchema>;

export async function summarizeGridReports(
  input: SummarizeGridReportsInput
): Promise<SummarizeGridReportsOutput> {
  return aiSummarizedGridReportsFlow(input);
}

const aiSummarizedGridReportsPrompt = ai.definePrompt({
  name: 'aiSummarizedGridReportsPrompt',
  input: {schema: SummarizeGridReportsInputSchema},
  output: {schema: SummarizeGridReportsOutputSchema},
  prompt: `You are an expert energy grid analyst. Your task is to summarize a grid performance report for a regulator or high-level executive. The summary should be concise, highlight key trends, significant anomalies, and critical performance drivers, and optionally include recommendations. Focus on providing actionable insights without requiring a deep dive into extensive data.

Report Title: {{{reportTitle}}}

Report Content: {{{reportContent}}}

{{#if context}}
Context for Summary: {{{context}}}
{{/if}}
`,
});

const aiSummarizedGridReportsFlow = ai.defineFlow(
  {
    name: 'aiSummarizedGridReportsFlow',
    inputSchema: SummarizeGridReportsInputSchema,
    outputSchema: SummarizeGridReportsOutputSchema,
  },
  async (input) => {
    const {output} = await aiSummarizedGridReportsPrompt(input);
    return output!;
  }
);
