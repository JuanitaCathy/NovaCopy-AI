'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from './_actions'
import NavbarDemo from '@/components/Header'

export default function OnboardingComponent() {
  const { user } = useUser()
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const applicationName = formData.get('applicationName') as string | null
    const applicationType = formData.get('applicationType') as string | null

    if (applicationName && applicationType) {
      const response = await completeOnboarding(formData)
      console.log(response.message)

      if (response.message === 'User metadata Updated') {
        try {
          await user?.reload()  // Ensure user reloads successfully
          router.push('/dashboard')  // Redirect to the dashboard
        } catch (error) {
          console.error('Error reloading user:', error)
        }
      }
    } else {
      console.error("Form data is missing required fields or has incorrect types")
    }
  }

  return (
    <>
      <NavbarDemo />
      <div className="px-8 py-12 sm:py-16 md:px-20">
        <div className="mx-auto max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-900">Welcome!</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 px-8 pb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Application Name
                </label>
                <p className="text-xs text-gray-500">Enter the name of your application.</p>
                <input
                  type="text"
                  name="applicationName"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Application Type</label>
                <p className="text-xs text-gray-500">Describe the type of your application.</p>
                <input
                  type="text"
                  name="applicationType"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-4">
              <button
                type="submit"
                className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
