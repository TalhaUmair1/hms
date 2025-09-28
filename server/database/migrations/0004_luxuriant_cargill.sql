CREATE TABLE `credentials` (
	`userId` integer NOT NULL,
	`id` text NOT NULL,
	`publicKey` text NOT NULL,
	`counter` integer NOT NULL,
	`backedUp` integer NOT NULL,
	`transports` text NOT NULL,
	PRIMARY KEY(`userId`, `id`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `credentials_id_unique` ON `credentials` (`id`);