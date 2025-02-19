import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Put} from '@nestjs/common';
import {MenusService} from "./menus.service";
import {Menu} from "@prisma/client";
import {v4} from "uuid";

@Controller('menus')
export class MenusController {
    constructor(private service: MenusService) {}

    @Put('menu')
    async create(@Body() body: Menu) {
        return this.service.create({
            id: v4(),
            name: body.name,
            parentId: body.parentId,
            rootId: body.rootId,
            depth: body.depth
        });
    }

    @Get('menu/:id')
    async getById(@Param('id') id: string) {
        const menu = await this.service.menu({ id });
        if (!menu) {
            throw new HttpException('Menu not found', HttpStatus.NOT_FOUND);
        }
        return menu;
    }

    @Put('menu/:id')
    async update(@Param('id') id: string, @Body() body: {name: string}) {
        return this.service.update({
            where: {id},
            data: { name: body.name },
        });
    }

    @Delete('menu/:id')
    async remove(@Param('id') id: string) {
        this.service.delete({ id });
    }



    @Get('roots')
    async getAllRoots() {
        const menus = await this.service.menus({
            where: {
                rootId: null,
            }
        });

        return menus.map(item => {
            return {
                id: item.id,
                name: item.name,
            }
        });
    }

    @Get('tree/:rootId')
    async getRootWithChildren(@Param('rootId') rootId: string) {
        const root = await this.service.menu({
            id: rootId,
        });
        if (!root) {
            throw new HttpException('Invalid Root Id', HttpStatus.NOT_FOUND);
        }

        const childrenTree = await this.service.getChildren(root);

        return {
            ...root,
            children: childrenTree
        }
    }
}
