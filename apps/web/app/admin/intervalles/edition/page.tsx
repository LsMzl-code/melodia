import HeadingAdmin from '@/components/admin/heading-admin'
import React from 'react'
import { Metadata } from 'next';
import ScaleIntervalForm from '../components/forms/scale-interval.form';
import ChordIntervalForm from '../components/forms/chord-interval.form';

export const metadata: Metadata = {
  title: "Admin - Intervalles/Edition",
  description: "Generated by create next app",
};

const AdminEditIntervalsPage = () => {
  return (
    <>
      <HeadingAdmin  />

      <section className='mx-auto p-3 md:p-5 lg:p-7 space-y-5'>
        {/* Form */}

        <ScaleIntervalForm />
        <ChordIntervalForm />


      </section>

    </>
  )
}

export default AdminEditIntervalsPage