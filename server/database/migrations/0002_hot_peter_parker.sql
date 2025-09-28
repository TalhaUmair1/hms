CREATE TABLE `appointments` (
	`id` integer PRIMARY KEY NOT NULL,
	`patient_id` integer,
	`doctor_id` integer,
	`date` integer,
	`time` integer,
	`status` text
);
--> statement-breakpoint
CREATE TABLE `billing` (
	`id` integer PRIMARY KEY NOT NULL,
	`appointment_id` integer,
	`patient_id` integer,
	`amount` real,
	`status` text,
	`payment_method` text
);
--> statement-breakpoint
CREATE TABLE `prescriptions` (
	`id` integer PRIMARY KEY NOT NULL,
	`appointment_id` integer,
	`doctor_id` integer,
	`patient_id` integer,
	`medicine_list` text,
	`notes` text
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`quantity` integer,
	`price` real,
	`expiry_date` integer
);
