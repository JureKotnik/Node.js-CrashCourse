import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

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
    getOneNinja(@Param('id', ParseIntPipe) id: number){
        try{
            return this.ninjasService.getNinja(id);
        }
        catch(err){
            throw new NotFoundException();
        }
        
    }

    //POST
    @Post()
    @UseGuards(BeltGuard)
    createNinja(@Body( new ValidationPipe()) createNinjaDto: CreateNinjaDto){
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



