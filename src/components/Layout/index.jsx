import React from 'react'
import TopBar from '../TopBar'
import UserList from '../UserList'

const Layout = ({ children }) => {
  return (
    <div>
      <TopBar />
      <div style={{ display: "flex", gap: 8 }}>
        <UserList />
        {children}
      </div>
    </div>
  )
}

export default Layout