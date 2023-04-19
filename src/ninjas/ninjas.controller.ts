import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService){}
    // GET / ninjas --> []
    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunchunks'){
        //const service = new NinjasService();
        return this.ninjasService.getNinjas(weapon);
    }

    // GET / ninjas/:id --> {}
    @Get(':id')
    getOneNinja(@Param('id') id: string){
        return this.ninjasService.getNinja(+id);
    }

    //POST
    @Post()
    createNinja(@Body() createNinjaDto: CreateNinjaDto){
        return this.ninjasService.createNinja(createNinjaDto);
    }

    //PUT
    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto){
        return this.ninjasService.updateNinja(+id, updateNinjaDto);
    }
    //DELETE
    @Delete(':id')
    deleteNinja(@Param('id') id: string){
        return this.ninjasService.removeNinja(+id);
    }
}



