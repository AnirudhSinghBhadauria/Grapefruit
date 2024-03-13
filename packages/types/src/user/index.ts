import { z } from "zod";

export const UserPets = z.array(
  z.object({
    fullName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    petName: z.string(),
  })
);

// Types
export type UserPets = z.infer<typeof UserPets>;
