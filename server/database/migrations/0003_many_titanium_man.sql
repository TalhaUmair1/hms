CREATE TABLE `pharmacy` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`quantity` integer NOT NULL,
	`price` integer NOT NULL,
	`expiry_date` text
);
--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_appointments` (
	`id` integer PRIMARY KEY NOT NULL,
	`patient_id` integer,
	`doctor_id` integer,
	`date` text NOT NULL,
	`status` text DEFAULT 'pending'
);
--> statement-breakpoint
INSERT INTO `__new_appointments`("id", "patient_id", "doctor_id", "date", "status") SELECT "id", "patient_id", "doctor_id", "date", "status" FROM `appointments`;--> statement-breakpoint
DROP TABLE `appointments`;--> statement-breakpoint
ALTER TABLE `__new_appointments` RENAME TO `appointments`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_patients` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer,
	`dob` text,
	`gender` text,
	`medical_history` text
);
--> statement-breakpoint
INSERT INTO `__new_patients`("id", "user_id", "dob", "gender", "medical_history") SELECT "id", "user_id", "dob", "gender", "medical_history" FROM `patients`;--> statement-breakpoint
DROP TABLE `patients`;--> statement-breakpoint
ALTER TABLE `__new_patients` RENAME TO `patients`;