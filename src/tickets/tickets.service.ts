import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';

const allowedStates = ['nouveau', 'en_cours', 'en_attente', 'resolu', 'ferme'] as const;
type TicketState = typeof allowedStates[number];

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

    setState(id: string, state: TicketState): Ticket {
        const ticket = this.getById(id);

        ticket.state = state;
        return ticket;
    }

    archivedAt(id: string): Ticket {
        const ticket = this.getById(id);

        if (ticket.archivedAt !== null) {
            throw new ConflictException('Ticket already archived');
        }

        ticket.archivedAt = new Date().toISOString();
        return ticket;
    }
}
