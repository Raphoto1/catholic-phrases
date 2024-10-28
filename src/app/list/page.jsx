//app
import React from 'react'
//own
import PhrasesList from '@/Components/PhrasesList'
import frases from '../../Data/frases'
export default function list() {
  return (
    <div>
      <PhrasesList frases={frases}/>
    </div>
  )
}
