CREATE TABLE `doctors` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer,
	`specialization` text,
	`fees` real,
	`availability` text
);
--> statement-breakpoint
CREATE TABLE `patients` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer,
	`dob` integer,
	`gender` text,
	`medical_history` text
);
