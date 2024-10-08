import HeadingAdmin from '@/components/admin/heading-admin';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Admin - Divers",
  description: "Generated by create next app",
};

const AdminDiversPage = () => {
  return (
    <>
      <HeadingAdmin title='Tonalité, familles...' />

      <section className='grid grid-cols-1 xl:grid-cols-2 mx-auto p-3 md:p-5 lg:p-7 space-y-5'>

        <div>Tableau</div>



      </section>
    </>
  )
}

export default AdminDiversPage