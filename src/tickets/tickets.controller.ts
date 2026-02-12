import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStateDto } from './dto/update-ticket-state.dto';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Get()
    list() {
        return this.ticketsService.list();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.ticketsService.getById(id);
    }

    @Post()
    create(@Body() dto: CreateTicketDto) {
        return this.ticketsService.create(dto.title);
    }

    @Patch(':id/state')
    setState(@Param('id') id: string, @Body() dto: UpdateTicketStateDto) {
        return this.ticketsService.setState(id, dto.state);
    }

    @Patch(':id/archive')
    archive(@Param('id') id: string) {
        return this.ticketsService.archivedAt(id);
    }
}
