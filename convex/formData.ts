import { query } from "./_generated/server";
import { mutation } from './_generated/server';


export const saveFormData = mutation(async ({ db }, formData) => {
  await db.insert('form_data', formData);
});
