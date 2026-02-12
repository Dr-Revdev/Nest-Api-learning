import { IsIn } from 'class-validator';

const allowedStates = ['nouveau', 'en_cours', 'en_attente', 'resolu', 'ferme'] as const;
export type TicketState = typeof allowedStates[number];

export class UpdateTicketStateDto {
    @IsIn(allowedStates)
    state! : TicketState;
}