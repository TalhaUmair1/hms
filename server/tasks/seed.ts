import { useDatabase, tables } from '../utils'
import { eq } from 'drizzle-orm'


export default defineTask({
  meta: {
    name: 'seed:database',
    description: 'Seed the database with sample data'
  },
  run: async ({ payload, context }) => {
    console.log('Running migrations...')
    
    // Run migrations first
    try {
      const { migrate } = await import('drizzle-orm/better-sqlite3/migrator')
      const { drizzle } = await import('drizzle-orm/better-sqlite3')
      const Database = await import('better-sqlite3')
      
      // Use the same database file as configured
      const dbFileName = process.env.DB_FILE_NAME || 'hms.db';
      // Extract the actual file name from the SQLite URL format (e.g., 'file:hms.db' -> 'hms.db')
      const fileName = dbFileName.replace('file:', '');
      
      const sqlite = new Database.Database(fileName)
      const migratedDb = drizzle(sqlite)
      
      await migrate(migratedDb, { migrationsFolder: './server/database/migrations' })
      
      sqlite.close()
      console.log('Migrations completed!')
    } catch (error) {
      console.error('Error running migrations:', error)
      throw error
    }
    
    console.log('Seeding database...')
    
    const db = useDatabase()

    try {
      // Clear existing data (in reverse order due to foreign key constraints)
      await db.delete(tables.billing).run()
      await db.delete(tables.prescriptions).run()
      await db.delete(tables.appointments).run()
      await db.delete(tables.pharmacy).run()
      await db.delete(tables.patients).run()
      await db.delete(tables.doctors).run()
      await db.delete(tables.users).run()

      // Insert sample users
      console.log('Inserting users...')
      const userResults = await db
        .insert(tables.users)
        .values([
          {
            name: 'Admin User',
            email: 'admin@example.com',
            password: await hashPassword('12345678'),
            role: 'admin',
            phone: '+1234567890',
            address: '123 Admin St, City, Country',
          },
          {
            name: 'Dr. John Smith',
            email: 'john.smith@example.com',
            password: await hashPassword('12345678'),
            role: 'doctor',
            phone: '+1987654321',
            address: '456 Doctor Ave, City, Country',
          },
          {
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@example.com',
            password: await hashPassword('12345678'),
            role: 'doctor',
            phone: '+1555123456',
            address: '789 Medical Blvd, City, Country',
          },
          {
            name: 'Patient One',
            email: 'patient1@example.com',
            password: await hashPassword('12345678'),
            role: 'patient',
            phone: '+1111111111',
            address: '321 Patient Rd, City, Country',
          },
          {
            name: 'Patient Two',
            email: 'patient2@example.com',
            password: await hashPassword('12345678'),
            role: 'patient',
            phone: '+2222222222',
            address: '654 Health Ln, City, Country',
          },
          {
            name: 'Manager User',
            email: 'manager@example.com',
            password: await hashPassword('12345678'),
            role: 'manager',
            phone: '+3333333333',
            address: '987 Manager Dr, City, Country',
          },
        ])
        .returning({ insertedId: tables.users.id })
      
      const userIds = userResults.map(result => result.insertedId)
      console.log(`Inserted ${userIds.length} users`)

      // Insert sample doctors
      console.log('Inserting doctors...')
      const doctorResults = await db
        .insert(tables.doctors)
        .values([
          {
            user_id: userIds[1], // Dr. John Smith
            specialization: 'Cardiology',
            fees: 150.0,
            availability: 'Mon-Fri: 9AM-5PM',
          },
          {
            user_id: userIds[2], // Dr. Sarah Johnson
            specialization: 'Pediatrics',
            fees: 120.0,
            availability: 'Mon-Wed-Fri: 10AM-6PM',
          },
        ])
        .returning({ insertedId: tables.doctors.id })
      
      const doctorIds = doctorResults.map(result => result.insertedId)
      console.log(`Inserted ${doctorIds.length} doctors`)

      // Insert sample patients
      console.log('Inserting patients...')
      const patientResults = await db
        .insert(tables.patients)
        .values([
          {
            user_id: userIds[3], // Patient One
            dob: '1990-05-15',
            gender: 'Male',
            medical_history: 'Allergic to penicillin',
          },
          {
            user_id: userIds[4], // Patient Two
            dob: '1985-11-22',
            gender: 'Female',
            medical_history: 'Diabetic, Hypertension',
          },
        ])
        .returning({ insertedId: tables.patients.id })
      
      const patientIds = patientResults.map(result => result.insertedId)
      console.log(`Inserted ${patientIds.length} patients`)

      // Insert sample appointments
      console.log('Inserting appointments...')
      const appointmentResults = await db
        .insert(tables.appointments)
        .values([
          {
            patient_id: patientIds[0],
            doctor_id: doctorIds[0],
            date: '2024-01-15 10:00:00',
            status: 'completed',
          },
          {
            patient_id: patientIds[0],
            doctor_id: doctorIds[1],
            date: '2024-01-16 14:00:00',
            status: 'confirmed',
          },
          {
            patient_id: patientIds[1],
            doctor_id: doctorIds[0],
            date: '2024-01-17 09:00:00',
            status: 'pending',
          },
          {
            patient_id: patientIds[1],
            doctor_id: doctorIds[1],
            date: '2024-01-18 11:00:00',
            status: 'canceled',
          },
        ])
        .returning({ insertedId: tables.appointments.id })
      
      const appointmentIds = appointmentResults.map(result => result.insertedId)
      console.log(`Inserted ${appointmentIds.length} appointments`)

      // Insert sample prescriptions
      console.log('Inserting prescriptions...')
      await db
        .insert(tables.prescriptions)
        .values([
          {
            appointment_id: appointmentIds[0],
            doctor_id: doctorIds[0],
            patient_id: patientIds[0],
            medicine_list: 'Aspirin 100mg, Paracetamol 500mg',
            notes: 'Take after meals for 7 days',
          },
          {
            appointment_id: appointmentIds[1],
            doctor_id: doctorIds[1],
            patient_id: patientIds[0],
            medicine_list: 'Vitamin D3 1000IU, Calcium 500mg',
            notes: 'Once daily for 30 days',
          },
        ])
      console.log('Inserted prescriptions')

      // Insert sample billing records
      console.log('Inserting billing records...')
      await db
        .insert(tables.billing)
        .values([
          {
            appointment_id: appointmentIds[0],
            patient_id: patientIds[0],
            amount: 150.0,
            status: 'paid',
            payment_method: 'credit_card',
          },
          {
            appointment_id: appointmentIds[1],
            patient_id: patientIds[0],
            amount: 120.0,
            status: 'pending',
            payment_method: 'cash',
          },
          {
            appointment_id: appointmentIds[2],
            patient_id: patientIds[1],
            amount: 150.0,
            status: 'pending',
            payment_method: 'insurance',
          },
        ])
      console.log('Inserted billing records')

      // Insert sample pharmacy items
      console.log('Inserting pharmacy items...')
      await db
        .insert(tables.pharmacy)
        .values([
          {
            name: 'Aspirin',
            quantity: 100,
            price: 5,
            expiryDate: '2025-12-31',
          },
          {
            name: 'Paracetamol',
            quantity: 200,
            price: 3,
            expiryDate: '2025-10-15',
          },
          {
            name: 'Vitamin D3',
            quantity: 50,
            price: 15,
            expiryDate: '2025-08-20',
          },
          {
            name: 'Ibuprofen',
            quantity: 75,
            price: 8,
            expiryDate: '2026-01-30',
          },
        ])
      console.log('Inserted pharmacy items')

      console.log('Database seeding completed successfully!')
      return { result: { success: true, message: 'Database seeded successfully' } }
    } catch (error) {
      console.error('Error seeding database:', error)
      throw error
    }
  }
})