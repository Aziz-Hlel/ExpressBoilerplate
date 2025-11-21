import z from "zod";

const envSchema = z
  .object({
    DATABASE_URL: z.url(),
    PORT: z.coerce.number().optional(),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    FIREBASE_CERT: z.string(),
  })
  .refine((data) => {
    (data.NODE_ENV === "development" && data.PORT !== undefined,
      "PORT is required in development mode");
  });

const validatedEnv = envSchema.safeParse(process.env);
if (!validatedEnv.success) throw new Error(validatedEnv.error.message);

const ENV = validatedEnv.data;

export default ENV;
