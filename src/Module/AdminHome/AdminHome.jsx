import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../Routes/path'

const AdminHome = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={() => {
        navigate(PATH.ADMIN_REGISTER)
      }}>
        dangky
      </Button>
      <Button onClick={() => {
        navigate(PATH.ADMIN_LOGIN)
      }}>
        login
      </Button>
    </div>
  )
}

export default AdminHome