import React from 'react'
import { Link } from 'react-router-dom'

function ListingItem({listing, id}) {
  return (
    <li>
      <Link to={`/category/${listing.type}/${id}`}>
        <img src={listing.imgUrls[0]} alt="" />
      </Link>
    </li>
  )
}

export default ListingItem