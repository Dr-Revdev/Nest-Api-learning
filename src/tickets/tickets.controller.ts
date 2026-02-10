import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TicketsService } from './tickets.service';

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
    create(@Body('title') title: string) {
        return this.ticketsService.create(title);
    }
}
