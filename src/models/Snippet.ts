import mongoose, { Schema } from 'mongoose';

export interface ISnippet {
  id: string;
  text: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

const snippetSchema = new Schema<ISnippet>(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform: (doc, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Index for better query performance
snippetSchema.index({ createdAt: -1 });

export const Snippet = mongoose.model<ISnippet>('Snippet', snippetSchema);
