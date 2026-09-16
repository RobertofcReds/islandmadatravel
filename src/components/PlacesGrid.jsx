import { useEffect, useState } from 'react'
import PlaceCard from './PlaceCard'
import PlaceDetailSection from './PlaceDetailSection'
const columnCount = () => window.innerWidth < 480 ? 1 : window.innerWidth < 768 ? 2 : window.innerWidth < 1180 ? 3 : 4
export default function PlacesGrid({ places, selectedPlace, onSelect, onClose }) {
  const [columns, setColumns] = useState(columnCount)
  useEffect(() => {
    const update = () => setColumns(columnCount())
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  const selectedIndex = places.findIndex(place => place.id === selectedPlace?.id)
  const close = () => {
    const id = selectedPlace?.id
    onClose()
    requestAnimationFrame(() => document.getElementById(`place-${id}`)?.focus({ preventScroll: true }))
  }
  return <div className="places-grid">{places.flatMap((place, index) => {
    const rowEnd = (index + 1) % columns === 0 || index === places.length - 1
    const selectedRow = selectedIndex >= 0 && Math.floor(selectedIndex / columns) === Math.floor(index / columns)
    const card = <PlaceCard key={place.id} place={place} isSelected={selectedPlace?.id === place.id} onClick={onSelect}/>
    return rowEnd && selectedRow ? [card, <div className="place-expanded" key={`details-${selectedPlace.id}`}><PlaceDetailSection place={selectedPlace} onClose={close}/></div>] : [card]
  })}</div>
}
