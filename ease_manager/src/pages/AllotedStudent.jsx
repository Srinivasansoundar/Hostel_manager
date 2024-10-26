
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'flowbite-react'
function AllotedStudent() {
  const { blockName } = useParams();
  // console.log(blockName)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //   console.log(blockName)
  useEffect(() => {
    // Fetch the data from the backend
    fetch(`/api/admin/allotedStudent/${blockName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [blockName]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log(data)
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-2xl font-semibold mb-4'>Alloted student of {blockName}</h1>
      <div className="overflow-x-auto w-9/12">
        <Table striped>
          <Table.Head>
            <Table.HeadCell className='bg-teal-200'>Floor Number</Table.HeadCell>
            <Table.HeadCell className='bg-rose-100'>Room Number</Table.HeadCell>
            <Table.HeadCell className='bg-teal-200'>Roomates</Table.HeadCell>
            <Table.HeadCell className='bg-rose-100' >Roll number</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((v, rowIndex) => (
              <React.Fragment key={v.floor + v.roomNumber}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell rowSpan={v.roommates.length} className={`whitespace-nowrap font-medium text-gray-900 dark:text-white ${rowIndex % 2 === 0 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-600'}`}>
                    {v.floor}
                  </Table.Cell>
                  <Table.Cell rowSpan={v.roommates.length} className={`whitespace-nowrap font-medium text-gray-900 dark:text-white ${rowIndex % 2 === 1 ? 'bg-gray-100 dark:bg-orange-400' : 'bg-gray-200 dark:bg-gray-600'}`}>
                    {v.roomNumber}
                  </Table.Cell>
                  <Table.Cell>
                    {v.roommates[0].name}
                  </Table.Cell>
                  <Table.Cell>
                    {v.roommates[0].rollNumber}
                  </Table.Cell>
                </Table.Row>
                {v.roommates.slice(1).map((l, index) => (
                  <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{l.name}</Table.Cell>
                    <Table.Cell>{l.rollNumber}</Table.Cell>
                  </Table.Row>
                ))}
              </React.Fragment>
            ))}
          </Table.Body>

        </Table>
      </div>
    </div>
  )
}

export default AllotedStudent