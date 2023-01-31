import { Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { isUndefined } from 'util';
import { AppService } from './app.service';
import { Csavar } from './csavar.entity';
import { Rendeles } from './rendeles.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get('/csavar')
  async getCsavarok() {
    const repo = this.dataSource.getRepository(Csavar)
    const rows = await repo.find()
    return {csavarok : rows}
  }
  @Post('/csavar') 
  async createNewCsavar(@Body() csavar : Csavar) {
    let error = "";
    csavar.id = undefined
    if(csavar.tipus == undefined ||csavar.tipus.trim() == "" ) {
      error = "A csavar tipusának megadása kötelező"
      return error
    }
    if(csavar.hossz <= 0 || isNaN(csavar.hossz)) {
      error = "A csavar hosszának megadása kötelező"
      return error
    }
    if(isNaN(csavar.keszlet) || csavar.keszlet < 0) {
      error = "A csavar készlet megadása kötelező"
      return error
    }
    if(csavar.ar <= 0 || isNaN(csavar.hossz)) {
      error = "A csavar árának megadása kötelező"
      return error
    }
    const repo = this.dataSource.getRepository(Csavar)
    await repo.save(csavar)
  

  }
  @Delete('/csavar/:id') 
  async deleteCsavar(@Param('id') id : number) {
    const repo = this.dataSource.getRepository(Csavar)
    await repo.delete(id)
  }


  @Post('/csavar/:id/rendeles') 
  async csavarRendeles(@Param('id') id : number, @Body() rendeles : Rendeles ) {
    const repoRendeles = this.dataSource.getRepository(Rendeles)
    const repoCSavar = this.dataSource.getRepository(Csavar)
    let csavarkeszlet  = (await repoCSavar.findOneBy({id : id})).keszlet
    if(csavarkeszlet - rendeles.db < 0 ) {
      return { error: "Nincs elég csavar" }
    } else {
      repoCSavar.update({id : id}, {keszlet : csavarkeszlet-rendeles.db })

      let keszrendeles : Rendeles = {id : undefined, csavar_id : id,  db : rendeles.db  }
      repoRendeles.save(keszrendeles)
      return {osszertek : rendeles.db * (await repoCSavar.findOneBy({id : id})).ar }
    }

  }
}
