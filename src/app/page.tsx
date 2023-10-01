import ContactsPage from '@/components/ContactsPage'
import CreateContactPage from '@/components/CreateContactPage'
import EditContactPage from '@/components/EditContact'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between p-24 bg-gray-200">
      <ContactsPage />
      {/* <EditContactPage />
      <CreateContactPage /> */}
    </main>
  )
}
