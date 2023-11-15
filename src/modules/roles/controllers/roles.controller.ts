import { Controller, Get } from '@nestjs/common';
import { RolesService } from '../services/roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {
    
  }

  @Get()
  async index() {
    return await this.rolesService.findAll()
  }
}
