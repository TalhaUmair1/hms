PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_billing` (
	`id` integer PRIMARY KEY NOT NULL,
	`appointment_id` integer NOT NULL,
	`patient_id` integer NOT NULL,
	`amount` real NOT NULL,
	`status` text,
	`payment_method` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_billing`("id", "appointment_id", "patient_id", "amount", "status", "payment_method", "created_at", "updated_at") SELECT "id", "appointment_id", "patient_id", "amount", "status", "payment_method", "created_at", "updated_at" FROM `billing`;--> statement-breakpoint
DROP TABLE `billing`;--> statement-breakpoint
ALTER TABLE `__new_billing` RENAME TO `billing`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_pharmacy` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`quantity` integer NOT NULL,
	`price` integer NOT NULL,
	`expiry_date` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_pharmacy`("id", "name", "quantity", "price", "expiry_date", "created_at", "updated_at") SELECT "id", "name", "quantity", "price", "expiry_date", "created_at", "updated_at" FROM `pharmacy`;--> statement-breakpoint
DROP TABLE `pharmacy`;--> statement-breakpoint
ALTER TABLE `__new_pharmacy` RENAME TO `pharmacy`;