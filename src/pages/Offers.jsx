import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
import { db } from '../firebase'

function Offers() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedList, setLastFetchedList] = useState(null)

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "listings")
        const q = query(listingRef, where("offer", "==", true), orderBy("timeStamp", "desc"), limit(8))
        const querySnap = await getDocs(q)
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedList(lastVisible)
        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error("Could not fetch listing")
      }
    }
    fetchListings()
  }, [])

  // if (loading) {
  //   return <Spinner />
  // }

  async function onFetchMoreListings() {
    try {
      const listingRef = collection(db, "listings")
      const q = query(listingRef, where("offer", "==", true), orderBy("timeStamp", "desc"), startAfter(lastFetchedList), limit(4))
      const querySnap = await getDocs(q)
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedList(lastVisible)
      const listings = []
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error("Could not fetch listing")
    }
  }

  return (
    <div className='max-w-6xl mx-auto px-3'>
      <h1 className='text-center text-3xl mt-6 font-bold mb-6'>Offers</h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
              {listings.map((listing) => (
                <ListingItem key={listing.id} id={listing.id} listing={listing.data}/>
              ))}
            </ul>
          </main>
          {lastFetchedList && (
            <div className='flex justify-center items-center '>
              <button onClick={onFetchMoreListings} className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300  mb-6 mt-6 hover:border-slate-600 transition rounded duration-150 ease-in-out ">Load more</button>
            </div>
          )}
        </>
      ) : (
        <p>There are no current offers</p>
      )}
    </div>
  )
}

export default Offers