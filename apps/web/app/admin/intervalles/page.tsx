import HeadingAdmin from '@/components/admin/heading-admin';
import { getAllChordIntervals, getAllScaleIntervals } from '@/src/server/data/intervals.query';
import { Metadata } from 'next';
import { ChordsIntervalColumns } from './components/table/chords/Columns';
import { DataTable } from '@/components/ui/data-table';
import { ScaleIntervalColumns } from './components/table/scales/Columns';


export const metadata: Metadata = {
  title: "Admin - Intervalles",
  description: "Generated by create next app",
};

const AdminIntervalsPage = async () => {
  //*** DATAS ***//
  const chordsIntervaldata = await getAllChordIntervals()
  if (!chordsIntervaldata) return <div>Aucun intervalle d'accord trouvé...</div>
  const scalesIntervaldata = await getAllScaleIntervals()
  if (!scalesIntervaldata) return <div>Aucun intervalle de gamme trouvé...</div>


  //*** FORMATTED DATAS ***//
  const formattedChordIntervalsData: ChordsIntervalColumns[] = chordsIntervaldata.map(item => ({
    id: item.id,
    name: item.name,
    details: item.details,
    // chordsCount: item.chords?.length || 0,
    chordsCount:  0,
  }))
  const formattedScaleIntervalsData: ScaleIntervalColumns[] = scalesIntervaldata.map(item => ({
    id: item.id,
    name: item.name,
    details: item.details,
    // scalesCount: item.scales?.length || 0,
    scalesCount:  0,
  }))


  return (
    <>
      <HeadingAdmin href={'/admin/intervalles/edition'} title={'Ajouter un intervalle'} />

      <section className='grid grid-cols-1 xl:grid-cols-2 mx-auto p-3 md:p-5 lg:p-7'>
        {/* Data Table */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:gap-[200px]'>
          <div className="px-2 w-fit">
            <DataTable columns={ChordsIntervalColumns} data={formattedChordIntervalsData} searchKey="name" />
          </div>
          <div className="px-2 w-fit">
            <DataTable columns={ScaleIntervalColumns} data={formattedScaleIntervalsData} searchKey="name" />
          </div>

        </div>


      </section>

    </>
  )
}

export default AdminIntervalsPage