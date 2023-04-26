import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

@Schema({
  timestamps: true,
})
export class Vacancy extends Document {
  @Prop()
  applications: string[];

  @Prop()
  company: string;

  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  wage: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const VacancySchema = SchemaFactory.createForClass(Vacancy);
