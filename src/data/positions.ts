import type { Position } from '../types';

export interface PositionInfo {
  code: Position;
  name: string;
  line: 'Goalkeeper' | 'Defence' | 'Midfield' | 'Attack';
  description: string;
}

export const POSITION_INFO: Record<Position, PositionInfo> = {
  GK: {
    code: 'GK',
    name: 'Goalkeeper',
    line: 'Goalkeeper',
    description: 'Last line of defence and, increasingly, the first passer in build-up.',
  },
  CB: {
    code: 'CB',
    name: 'Centre-Back',
    line: 'Defence',
    description: 'Central defender who marks the striker, wins aerial duels and anchors the back line.',
  },
  LB: {
    code: 'LB',
    name: 'Left-Back',
    line: 'Defence',
    description: 'Left-sided defender. In back-fives this slot doubles as a wing-back.',
  },
  RB: {
    code: 'RB',
    name: 'Right-Back',
    line: 'Defence',
    description: 'Right-sided defender. In back-fives this slot doubles as a wing-back.',
  },
  DMF: {
    code: 'DMF',
    name: 'Defensive Midfielder',
    line: 'Midfield',
    description: 'Holding midfielder who screens the defence and wins second balls.',
  },
  CMF: {
    code: 'CMF',
    name: 'Central Midfielder',
    line: 'Midfield',
    description: 'All-round midfielder connecting defence and attack.',
  },
  AMF: {
    code: 'AMF',
    name: 'Attacking Midfielder',
    line: 'Midfield',
    description: 'Creative midfielder who operates between the opposition lines.',
  },
  LMF: {
    code: 'LMF',
    name: 'Left Midfielder',
    line: 'Midfield',
    description: 'Wide midfielder on the left. Doubles as a wing-back in 3-at-the-back shapes.',
  },
  RMF: {
    code: 'RMF',
    name: 'Right Midfielder',
    line: 'Midfield',
    description: 'Wide midfielder on the right. Doubles as a wing-back in 3-at-the-back shapes.',
  },
  LWF: {
    code: 'LWF',
    name: 'Left Wing Forward',
    line: 'Attack',
    description: 'Left-sided forward who stretches the defence and cuts inside to shoot.',
  },
  RWF: {
    code: 'RWF',
    name: 'Right Wing Forward',
    line: 'Attack',
    description: 'Right-sided forward who stretches the defence and cuts inside to shoot.',
  },
  SS: {
    code: 'SS',
    name: 'Second Striker',
    line: 'Attack',
    description: 'Forward who plays just behind or alongside the main striker.',
  },
  CF: {
    code: 'CF',
    name: 'Centre Forward',
    line: 'Attack',
    description: 'Main striker responsible for finishing and occupying the centre-backs.',
  },
};

export function positionName(position: Position): string {
  return POSITION_INFO[position].name;
}
