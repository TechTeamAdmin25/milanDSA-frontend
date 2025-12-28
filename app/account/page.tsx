'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

type StudentDatabaseRow = Database['public']['Tables']['student_database']['Row']

export default function AccountPage() {
  const [student, setStudent] = useState<StudentDatabaseRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [updating, setUpdating] = useState(false)
  const router = useRouter()

  // Function to refresh student data from database
  const refreshStudentData = async () => {
    try {
      console.log('🔄 [ACCOUNT] Refreshing student data...')

      const studentEmail = localStorage.getItem('studentEmail')
      if (!studentEmail) {
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('student_database')
        .select('*')
        .eq('email', studentEmail)
        .single<StudentDatabaseRow>()

      if (error) {
        console.error('❌ [ACCOUNT] Error refreshing student data:', error)
        return
      }

      console.log('✅ [ACCOUNT] Student data refreshed')
      console.log('📱 [ACCOUNT] Phone number:', data?.phone_number)
      console.log('📧 [ACCOUNT] Personal email:', data?.personal_email)
      setStudent(data)
    } catch (err) {
      console.error('❌ [ACCOUNT] Error refreshing data:', err)
    }
  }

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('studentEmail')
    // Clear student state
    setStudent(null)
    setDataLoaded(false)
    // Redirect to login
    router.push('/login')
  }

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Get student email from localStorage
        const studentEmail = localStorage.getItem('studentEmail')

        if (!studentEmail) {
          // No session found, redirect to login
          router.push('/login')
          return
        }

        console.log('📝 [ACCOUNT] Fetching student data for:', studentEmail)

        // Fetch student data from database
        const { data, error } = await supabase
          .from('student_database')
          .select('*')
          .eq('email', studentEmail)
          .single<StudentDatabaseRow>()

        if (error) {
          console.error('❌ [ACCOUNT] Error fetching student data:', error)
          router.push('/login')
          return
        }

        console.log('✅ [ACCOUNT] Student data loaded:', data?.full_name)
        console.log('📱 [ACCOUNT] Phone number:', data?.phone_number)
        console.log('📧 [ACCOUNT] Personal email:', data?.personal_email)
        setStudent(data)

        // Small delay to show the yellow box animation after data is loaded
        setTimeout(() => {
          setDataLoaded(true)
        }, 300)
      } catch (err) {
        console.error('❌ [ACCOUNT] Error:', err)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchStudentData()
  }, [router])

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Get status badge color


  // Handle updating student fields
  const handleUpdateField = async (field: 'phone_number' | 'personal_email', value: string) => {
    if (!student) return

    console.log('🔄 [ACCOUNT] Starting update for field:', field, 'with value:', value)
    setUpdating(true)
    try {
      console.log('📡 [ACCOUNT] Calling API to update student record with ID:', student.id)

      const response = await fetch('/api/update-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: student.id,
          field,
          value
        })
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('❌ [ACCOUNT] API error:', result.error)
        alert('Failed to update. Please try again.')
        return
      }

      console.log('✅ [ACCOUNT] API update successful, returned data:', result.data)

      // Update local state with the returned data
      if (result.data) {
        setStudent(result.data)
        console.log('✅ [ACCOUNT] Local state updated with API data')
      } else {
        // Fallback: refresh data from database
        console.log('⚠️ [ACCOUNT] No data returned, refreshing from database...')
        await refreshStudentData()
      }

      // Show success message
      const fieldName = field === 'phone_number' ? 'Phone number' : 'Personal email'
      alert(`${fieldName} updated successfully!`)
    } catch (err) {
      console.error('❌ [ACCOUNT] Error:', err)
      alert('Failed to update. Please try again.')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Milan Logo in top left corner */}
      <div className="absolute top-6 right-20 z-50">
        <Image
          src="/Sprites/MilanLogo.png"
          alt="Milan Logo"
          width={300}
          height={240}
          className="object-contain"
        />
      </div>

      {/* Purple block with background image */}
      <div className="relative h-[100vh] w-full overflow-hidden">
        <Image
          src="/BackgroundImages/AccountBackground.png"
          alt="Account Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Yellow block with student data - overlapping purple block */}
      <div className="relative -mt-[70vh] mx-4 md:mx-8 lg:mx-70 z-10">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-yellow-200 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl border-2 border-black p-8 md:p-12 shadow-lg"
            >
              <div className="flex items-center justify-center py-12">
                <div className="text-black text-xl font-semibold">Loading student data...</div>
              </div>
            </motion.div>
          ) : student && dataLoaded ? (
            <motion.div
              key="student-data"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-yellow-200 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl border-2 border-black p-8 md:p-12 shadow-lg relative"
            >
              <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                {/* Avatar placeholder circle */}
                <div className="w-20 h-20 rounded-full border-2 border-black bg-transparent flex-shrink-0"></div>

                {/* Student name and registration */}
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                    {student.full_name || 'Student Name'}
                  </h2>
                  <p className="text-lg md:text-xl text-black/80">
                    {student.registration_number || 'Registration Number'}
                  </p>
                </div>
              </div>

              {/* All other student data */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t-2 border-black/20">
                {/* Column 1 */}
                <div className="space-y-4">
                  {student.email && (
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-black/60 uppercase tracking-wide">Email : </p>
                      <p className="text-base md:text-md text-black font-medium">{student.email}</p>
                    </div>
                  )}

                  {student.program && (
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-black/60 uppercase tracking-wide">Program : </p>
                      <p className="text-base md:text-md text-black font-medium">{student.program}</p>
                    </div>
                  )}

                  {student.department && (
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-black/60 uppercase tracking-wide">Department : </p>
                      <p className="text-base md:text-md text-black font-medium">{student.department}</p>
                    </div>
                  )}
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  {student.specialization && (
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-black/60 uppercase tracking-wide">Specialization : </p>
                      <p className="text-base md:text-md text-black font-medium">{student.specialization}</p>
                    </div>
                  )}

                  {student.semester && (
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-black/60 uppercase tracking-wide">Semester</p>
                      <p className="text-base md:text-md text-black font-medium">{student.semester}</p>
                    </div>
                  )}

                  {student.batch && (
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-black/60 uppercase tracking-wide">Batch : </p>
                      <p className="text-base md:text-md text-black font-medium">{student.batch}</p>
                    </div>
                  )}
                </div>

                {/* Column 3 - Editable fields */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-black/60 uppercase tracking-wide">Phone Number</p>
                    <div className="flex items-center gap-2">
                      <p className="text-base md:text-md text-black font-medium flex-1">
                        {student.phone_number || 'Not provided'}
                      </p>
                      <button
                        className="text-black/60 hover:text-black transition-colors disabled:opacity-50"
                        disabled={updating}
                        onClick={() => {
                          const newPhone = prompt('Enter your phone number (leave empty to clear):', student.phone_number || '');
                          if (newPhone !== null) {
                            if (newPhone.trim() === '') {
                              // Clear the field
                              handleUpdateField('phone_number', '');
                            } else {
                              // Basic phone number validation
                              if (!/^\+?[\d\s\-\(\)]+$/.test(newPhone.trim())) {
                                alert('Please enter a valid phone number');
                                return;
                              }
                              handleUpdateField('phone_number', newPhone);
                            }
                          }
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-black/60 uppercase tracking-wide">Personal Email</p>
                    <div className="flex items-center gap-2">
                      <p className="text-base md:text-md text-black font-medium flex-1">
                        {student.personal_email || 'Not provided'}
                      </p>
                      <button
                        className="text-black/60 hover:text-black transition-colors disabled:opacity-50"
                        disabled={updating}
                        onClick={() => {
                          const newEmail = prompt('Enter your personal email (leave empty to clear):', student.personal_email || '');
                          if (newEmail !== null) {
                            if (newEmail.trim() === '') {
                              // Clear the field
                              handleUpdateField('personal_email', '');
                            } else {
                              // Basic email validation
                              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.trim())) {
                                alert('Please enter a valid email address');
                                return;
                              }
                              handleUpdateField('personal_email', newEmail);
                            }
                          }
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logout button in bottom right corner */}
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

      </div>

      {/* Bottom padding */}
      <div className="h-20"></div>

    </div>
  )
}
