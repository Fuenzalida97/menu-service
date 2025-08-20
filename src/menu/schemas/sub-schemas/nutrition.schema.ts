import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Nutrition {
  @Prop()
  calories: number;

  @Prop()
  protein: number;

  @Prop()
  carbs: number;

  @Prop()
  fat: number;
}
