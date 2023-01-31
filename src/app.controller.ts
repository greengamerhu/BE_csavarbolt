import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Csavar } from './csavar.entity';

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
  createNewCsavar(@Body() csavar : Csavar) {
    let error = "";
    csavar.id = undefined
    if(csavar.tipus.trim() == "") {
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
    repo.save(csavar)


  }

}
