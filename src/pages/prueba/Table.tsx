import React from 'react'
import TableComponent from '../../components/table/TableComponent'

const Table = () => {
  return (
    <TableComponent columns={[]} data={[]} meta={{
      total: 0
    }} currentPage={0} getData={function (page: number, sortOrder: string, sortColumn: string): void {
      throw new Error('Function not implemented.')
    } } onPageChange={function (page: number): void {
      throw new Error('Function not implemented.')
    } } pageSize={0}/>
  )
}

export default Table