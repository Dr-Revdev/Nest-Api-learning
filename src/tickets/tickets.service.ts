import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';

type TicketState = 'nouveau' | 'en_cours' | 'en_attente' | 'resolu' | 'ferme';

type Ticket = {
    id: string;
    title: string;
    state: TicketState;
    createdAt: string;
    archivedAt: string | null;
};

@Injectable()
export class TicketsService {

    // Tableau local pour test avant bdd
    private tickets: Ticket[] = [
        { 
            id: 'T1',
            title: 'Problème VPN', 
            state: 'nouveau', 
            createdAt: new Date().toISOString(), 
            archivedAt: null 
        },
        { 
            id: 'T2', 
            title: 'Imprimante HS', 
            state: 'en_cours', 
            createdAt: new Date().toISOString(), 
            archivedAt: null 
        },
    ];

    list(): Ticket[] {
        return this.tickets.filter(t => t.archivedAt === null);
    }

    create(title: string): Ticket {
        // Validation minimale
        if (typeof title !== 'string' || title.trim().length === 0) {
            throw new BadRequestException('title is required');
        }

        const newTicket: Ticket = {
            id: `T${this.tickets.length + 1}`,
            title: title.trim(),
            state: 'nouveau',
            createdAt: new Date().toISOString(),
            archivedAt: null,
        };

        this.tickets.push(newTicket);
        return newTicket;
    }

    getById(id: string): Ticket {
        const ticket = this.tickets.find(t => t.id === id);

        if (!ticket) {
            throw new NotFoundException('Ticket not found');
        }

        return ticket;
    }
}
