import HeadingAdmin from '@/components/admin/heading-admin';
import { Metadata } from 'next';
import { TonalitiesColumns } from './components/table/tonality/Columns';
import { getAllTonalities } from '../../../src/server/data/tonalities.query';
import { DataTable } from '@/components/ui/data-table';

export const metadata: Metadata = {
  title: "Admin - Tonalités",
  description: "Generated by create next app",
};

const AdminDiversPage = async () => {
  //*** DATAS ***//
  const data = await getAllTonalities()
  if (!data) return <div>No data</div>

  const formattedData: TonalitiesColumns[] = data.map(item => ({
    id: item.id,
    name: item.name,
  }))

  return (
    <>
      <HeadingAdmin href='/admin/divers/edition' title='Ajouter une tonalité' />

      <section className='grid grid-cols-1 xl:grid-cols-2 mx-auto p-3 md:p-5 lg:p-7 space-y-5'>

        {/* Data Table */}
        <div className="px-2 w-fit">
          <DataTable columns={TonalitiesColumns} data={formattedData} searchKey="name" />
        </div>

      </section>
    </>
  )
}

export default AdminDiversPage