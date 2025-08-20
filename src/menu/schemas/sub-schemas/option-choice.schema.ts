import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class OptionChoice {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: [String], required: true })
  choices: string[];

  @Prop({ type: [Number], required: true })
  extra_price: number[];
}
