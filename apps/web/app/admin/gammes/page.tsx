import HeadingAdmin from '@/components/admin/heading-admin';
import { Metadata } from 'next';
import { getAllScales } from '@/src/server/data/scales.query';
import { DataTable } from '@/components/ui/data-table';
import { ScalesColumns } from './components/table/Columns';


export const metadata: Metadata = {
  title: "Admin - Gammes",
  description: "Generated by create next app",
};

const AdminScalePage = async () => {
  //*** DATAS ***//
  const data = await getAllScales()
  if (!data) return <div>Aucune gamme trouvée...</div>

  const formattedData: ScalesColumns[] = data.map(item => ({
    id: item.id,
    name: item.name,
    notes: item.notes,
    interval: item.interval,
    tonality: item.tonality,
    mode: item.mode,
    family: item.family,
    degree: item.degree,
  }))
  return (
    <>
      <HeadingAdmin href={'/admin/gammes/edition'} title={'Ajouter une gamme'} />

      <section className='mx-auto p-3 md:p-5 lg:p-7'>
        {/* Data Table */}
        <div className="px-2 w-fit">
          <DataTable columns={ScalesColumns} data={formattedData} searchKey="name" />
        </div>
      </section>

    </>
  )
}

export default AdminScalePage