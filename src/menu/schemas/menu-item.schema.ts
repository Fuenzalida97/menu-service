import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Ingredient } from './sub-schemas/ingredient.schema';
import { Nutrition } from './sub-schemas/nutrition.schema';
import { OptionChoice } from './sub-schemas/option-choice.schema';

@Schema({
  timestamps: true, // Esto añade createdAt y updatedAt automáticamente
  collection: 'menu_items', // Nombre explícito para la colección en MongoDB
})
export class MenuItem extends Document {
  @Prop({ required: true, trim: true, index: true })
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ required: true, trim: true, index: true })
  category: string; // ej: main_course, drink, dessert

  @Prop({ trim: true, index: true })
  subCategory: string; // ej: burger, cocktail, coffee

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ default: 'CLP' })
  currency: string;

  @Prop({ default: true })
  available: boolean;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: [Ingredient] })
  ingredients: Ingredient[];

  @Prop({ type: Nutrition })
  nutrition: Nutrition;

  @Prop({ type: [OptionChoice] })
  options: OptionChoice[];

  @Prop({ type: [String] })
  images: string[];

  @Prop({ default: false })
  alcoholic: boolean;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
