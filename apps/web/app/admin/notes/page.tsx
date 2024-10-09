
import HeadingAdmin from '@/components/admin/heading-admin';
import { Metadata } from 'next';
import React from 'react'
import { NotesColumns } from './components/table/Columns';
import { DataTable } from '@/components/ui/data-table';
import { getAllNotes } from '@/src/server/data/notes.query';

export const metadata: Metadata = {
  title: "Admin - Notes",
  description: "Generated by create next app",
};

const AdminNotesPage = async () => {
  //*** DATAS ***//
  const data = await getAllNotes()
  if (!data) return <div>No data</div>

  const formattedData: NotesColumns[] = data.map(item => ({
    id: item.id,
    name: item.name,
    reference: item.reference,
    type: item.type,
    soundUrl: item.soundUrl
  }))

  return (
    <>
      <HeadingAdmin href={'/admin/notes/edition'} title={'Ajouter une note'} />

      <section className='mx-auto p-3 md:p-5 lg:p-7'>
        {/* Data Table */}
        <div className="px-2 w-fit">
          <DataTable columns={NotesColumns} data={formattedData} searchKey="name" />
        </div>
      </section>
    </>
  )
}

export default AdminNotesPage