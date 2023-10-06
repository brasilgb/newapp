import moment from "moment"
import React from 'react'

const Footer = () => {
  return (
    <footer className="flex flex-row items-center justify-betwen">
      <div className="flex flex-1 justify-end">
        <p>&copy;{moment().format('YYYY')}</p>
      </div>
      <div className="flex flex-1 justify-end">
        <p>dev</p>
      </div>
    </footer>
  )
}

export default Footer