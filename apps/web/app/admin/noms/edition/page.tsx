import HeadingAdmin from '@/components/admin/heading-admin'
import { Metadata } from 'next';
import AddScaleFamilyForm from '../components/forms/add-scale-name.form';
import AddChordFamilyForm from '../components/forms/add-chord-name.form';
import { getAllChordNames } from '@/src/server/data/names.query';

export const metadata: Metadata = {
  title: "Admin - Familles/Edition",
  description: "Generated by create next app",
};

const AdminEditFamilyPage = async () => {
  //*** DATAS ***//
  const allChordNames = await getAllChordNames()

  return (
    <>
      <HeadingAdmin/>

      <section className='mx-auto p-3 md:p-5 lg:p-7 space-y-5'>
        {/* Form */}
        <AddScaleFamilyForm />
        <AddChordFamilyForm/>

      </section>
    </>
  )
}

export default AdminEditFamilyPage