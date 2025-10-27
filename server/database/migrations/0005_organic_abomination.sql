PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_appointments` (
	`id` integer PRIMARY KEY NOT NULL,
	`patient_id` integer NOT NULL,
	`doctor_id` integer NOT NULL,
	`date` text NOT NULL,
	`status` text NOT NULL,
	FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_appointments`("id", "patient_id", "doctor_id", "date", "status") SELECT "id", "patient_id", "doctor_id", "date", "status" FROM `appointments`;--> statement-breakpoint
DROP TABLE `appointments`;--> statement-breakpoint
ALTER TABLE `__new_appointments` RENAME TO `appointments`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_billing` (
	`id` integer PRIMARY KEY NOT NULL,
	`appointment_id` integer NOT NULL,
	`patient_id` integer NOT NULL,
	`amount` real NOT NULL,
	`status` text,
	`payment_method` text,
	FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_billing`("id", "appointment_id", "patient_id", "amount", "status", "payment_method") SELECT "id", "appointment_id", "patient_id", "amount", "status", "payment_method" FROM `billing`;--> statement-breakpoint
DROP TABLE `billing`;--> statement-breakpoint
ALTER TABLE `__new_billing` RENAME TO `billing`;--> statement-breakpoint
CREATE TABLE `__new_doctors` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`specialization` text,
	`fees` real,
	`availability` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_doctors`("id", "user_id", "specialization", "fees", "availability") SELECT "id", "user_id", "specialization", "fees", "availability" FROM `doctors`;--> statement-breakpoint
DROP TABLE `doctors`;--> statement-breakpoint
ALTER TABLE `__new_doctors` RENAME TO `doctors`;--> statement-breakpoint
CREATE TABLE `__new_patients` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`dob` text,
	`gender` text,
	`medical_history` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_patients`("id", "user_id", "dob", "gender", "medical_history") SELECT "id", "user_id", "dob", "gender", "medical_history" FROM `patients`;--> statement-breakpoint
DROP TABLE `patients`;--> statement-breakpoint
ALTER TABLE `__new_patients` RENAME TO `patients`;--> statement-breakpoint
CREATE TABLE `__new_pharmacy` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`quantity` integer NOT NULL,
	`price` integer NOT NULL,
	`expiry_date` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_pharmacy`("id", "name", "quantity", "price", "expiry_date") SELECT "id", "name", "quantity", "price", "expiry_date" FROM `pharmacy`;--> statement-breakpoint
DROP TABLE `pharmacy`;--> statement-breakpoint
ALTER TABLE `__new_pharmacy` RENAME TO `pharmacy`;--> statement-breakpoint
CREATE TABLE `__new_prescriptions` (
	`id` integer PRIMARY KEY NOT NULL,
	`appointment_id` integer NOT NULL,
	`doctor_id` integer NOT NULL,
	`patient_id` integer NOT NULL,
	`medicine_list` text,
	`notes` text,
	FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_prescriptions`("id", "appointment_id", "doctor_id", "patient_id", "medicine_list", "notes") SELECT "id", "appointment_id", "doctor_id", "patient_id", "medicine_list", "notes" FROM `prescriptions`;--> statement-breakpoint
DROP TABLE `prescriptions`;--> statement-breakpoint
ALTER TABLE `__new_prescriptions` RENAME TO `prescriptions`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);