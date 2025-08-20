import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuItem } from './schemas/menu-item.schema';
import { CreateMenuItemDto } from './dto/create-menu-item.dto'; // Crearemos este DTO
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuService {
  // En el futuro, inyectarías el cliente del otro microservicio aquí
  // constructor(
  //   @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItem>,
  //   @Inject('FILE_UPLOAD_SERVICE') private readonly fileUploadClient: ClientProxy
  // ) {}
  constructor(
    @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItem>,
  ) {}

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const createdItem = new this.menuItemModel(createMenuItemDto);
    const savedItem = await createdItem.save();

    // --- PLACEHOLDER ---
    // TODO: Una vez implementado el file-upload-service, aquí se emitiría un evento.
    // El payload podría contener las imágenes a procesar y el ID del item.
    // Ejemplo: this.fileUploadClient.emit('process_menu_images', { itemId: savedItem._id, files: ... });

    return savedItem;
  }

  // async addImage(id: string, imageUrl: string): Promise<MenuItem> {
  //   // Este sería el método que el file-upload-service podría llamar
  //   // o que se usaría después de recibir la URL de vuelta.
  //   return this.menuItemModel.findByIdAndUpdate(
  //     id,
  //     { $push: { images: imageUrl } }, // $push añade un elemento al array
  //     { new: true },
  //   );
  // }

  async findAll(): Promise<MenuItem[]> {
    return this.menuItemModel.find().exec();
  }

  async findOne(id: string): Promise<MenuItem> {
    const item = await this.menuItemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Menu item with ID "${id}" not found`);
    }
    return item;
  }

  async update(
    id: string,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    const updatedItem = await this.menuItemModel
      .findByIdAndUpdate(id, updateMenuItemDto, { new: true })
      .exec();
    if (!updatedItem) {
      throw new NotFoundException(`Menu item with ID "${id}" not found`);
    }
    return updatedItem;
  }

  async remove(id: string): Promise<any> {
    const result = await this.menuItemModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Menu item with ID "${id}" not found`);
    }
    return { message: `Menu item with ID "${id}" deleted successfully` };
  }
}
