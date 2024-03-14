CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"displayPicture" text DEFAULT 'https://res.cloudinary.com/dakfyn60d/image/upload/v1710425369/rcjwpxmtpmvfdu19rda4.jpg' NOT NULL,
	"createdAt" timestamp(6) with time zone DEFAULT now(),
	"updatedAt" timestamp(6) with time zone DEFAULT now(),
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
