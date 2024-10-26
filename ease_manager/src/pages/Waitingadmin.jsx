import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Table } from 'flowbite-react';
function Waitingadmin() {
    const { blockName } = useParams();
    const [waitingList, setWaitingList] = useState([]);

    console.log(blockName)
    useEffect(() => {
        // Fetch the waiting list for the specified blockname
        const fetchWaitingList = async () => {
          try {
            const response = await fetch(`/api/waiting/get/${blockName}`);
            
            if (!response.ok) {
              throw new Error('Failed to fetch waiting list');
            }
    
            const data = await response.json();
            console.log(data)
            setWaitingList(data);
          } catch (error) {
            console.error('Error fetching waiting list:', error);
          }
        };
    
        fetchWaitingList();
      }, [blockName]);
  return (
    <div className='flex items-center justify-center  h-screen'>
    <div className="w-6/12 mx-auto waiting-list-container">
      <h2 className="waiting-list-title mb-10 rounded-none font-semibold text-3xl">Waiting List for {blockName}</h2>
      <Table className='rounded-sm'>
        <Table.Head>
          <Table.HeadCell>Roll Number</Table.HeadCell>
          <Table.HeadCell>Contact</Table.HeadCell>
          <Table.HeadCell>Block Name</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {waitingList.length > 0 ? (
            waitingList.map((item) => (
              <Table.Row key={item._id}>
                <Table.Cell>{item.rollNumber}</Table.Cell>
                <Table.Cell>{item.Contact}</Table.Cell>
                <Table.Cell>{item.BlockName}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={3} className="text-center">
                No waiting list entries found for this block.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
    </div>
  )
}

export default Waitingadmin