import { Injectable } from '@nestjs/common';
import { DatabaseService } from "@app/database";
import { Menu, Prisma } from "@prisma/client";

@Injectable()
export class MenusService {
    constructor(private readonly db: DatabaseService)
    {}

    async menu(menu: Prisma.MenuWhereUniqueInput): Promise<Menu | null> {
        return this.db.menu.findUnique({
            where: menu,
        });
    }

    async menus(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.MenuWhereUniqueInput;
        where?: Prisma.MenuWhereInput;
        orderBy?: Prisma.MenuOrderByWithRelationInput;
    }): Promise<Menu[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.db.menu.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async create(data: Prisma.MenuCreateInput): Promise<Menu> {
        return this.db.menu.create({
            data,
        });
    }

    async update(params: {
        where: Prisma.MenuWhereUniqueInput;
        data: Prisma.MenuUpdateInput;
    }): Promise<Menu> {
        const { where, data } = params;
        return this.db.menu.update({
            data,
            where,
        });
    }

    async delete(where: Prisma.MenuWhereUniqueInput): Promise<Menu> {
        return this.db.menu.delete({
            where,
        });
    }

    async getChildren(root: Menu): Promise<any> {
        const children = await this.menus({
            where: { rootId: root.id },
            orderBy: { depth: 'asc'}
        });
        const tree: any[] = [];
        const locations = {};

        children.forEach(child => {
            if(child.depth === 1) {
                tree.push({
                    ...child,
                    parentName: root.name,
                    children: [],
                });
                locations[child.id] = [ tree.length - 1 ];
            } else {
                const parentLocation: number[] = locations[child.parentId || 0];
                let parent: any = null;
                parentLocation.forEach((location, index) => {
                    if(index == 0) {
                        parent = tree[location];
                    } else {
                        parent = parent.children[location];
                    }
                });
                parent.children.push({
                    ...child,
                    parentName: parent.name,
                    children: [],
                });
                locations[child.id] = [...parentLocation, parent.children.length - 1];
            }
        })

        return tree;
    }
}
