import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Ingredient {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: String, default: false })
  allergen: string | boolean;
}
