import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  favorites: string[];

  @Prop()
  applications: string[];

  @Prop()
  company: boolean;

  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  hash: string;

  @Prop()
  age: string;

  @Prop()
  location: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  desiredPosition: string;

  @Prop()
  workExperience: string;

  @Prop()
  education: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
