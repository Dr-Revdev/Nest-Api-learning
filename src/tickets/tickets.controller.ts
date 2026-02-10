import { Body, Controller, Get, Post } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Get()
    list() {
        return this.ticketsService.list();
    }

    @Post()
    create(@Body('title') title: string) {
        return this.ticketsService.create(title);
    }
}
