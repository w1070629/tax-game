/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VehicleCard {
  id: string;
  name: string;
  type: 'ev' | 'private' | 'commercial' | 'scooter_light';
  description: string;
  imageIcon: string; // Will correspond to Lucide icon string keys
  correctCategoryId: string;
}

export interface TaxCategory {
  id: string;
  title: string;
  description: string;
  badge: string;
}

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  tip: string;
}

export interface PaymentChannel {
  id: string;
  name: string;
  isCorrect: boolean;
  icon: string;
  description: string;
}

export interface GameScore {
  score: number;
  timeElapsed: number; // in seconds
  correctCount: number;
  totalTasks: number;
  stars: number;
  playerName: string;
}

export interface VehicleTaxRule {
  type: string;
  ccRange: string;
  yearlyTax: number;
  notes?: string;
}
