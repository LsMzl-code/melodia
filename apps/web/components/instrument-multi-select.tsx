'use client'
import { useState } from 'react';
import { MultiSelect } from './ui/multi-select'
import { InstrumentsList } from '@/src/constants';

/**
 * Composant de sélection multiple d'instruments
 * @returns 
 */
const InstrumentMultiSelect = () => {
  //*** STATE ***//
  //TODO: Mettre les intruments de l'utilisateur en valeurs par défaut (["guitare", "piano"])
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);

  return (
    <MultiSelect
      options={InstrumentsList}
      onValueChange={setSelectedInstruments}
      defaultValue={selectedInstruments}
      placeholder="Sélectionner vos instruments"
      variant="inverted"
      animation={2}
      maxCount={3}
    />
  )
}

export default InstrumentMultiSelect