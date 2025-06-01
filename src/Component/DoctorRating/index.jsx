import { Box, Rating } from '@mui/material'
import React from 'react'
import { FaRegStar } from 'react-icons/fa'

export default function DoctorRating({ value, withText = false }) {
  const labels = {
    0.5: 'Poor',
    1: 'Poor+',
    1.5: 'Fair',
    2: 'Fair+',
    2.5: 'Average',
    3: 'Average+',
    3.5: 'Good',
    4: 'Very Good',
    4.5: 'Excellent',
    5: 'Outstanding',
  };
  return (
    <div>
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<FaRegStar style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {
        withText && <Box sx={{ ml: 2 }}>{labels[value]}</Box>

      }
    </div>
  )
}
