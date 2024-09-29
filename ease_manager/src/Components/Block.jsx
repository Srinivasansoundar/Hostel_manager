import React from 'react'
import { Card,ListGroup} from 'flowbite-react'
import { HiCloudDownload, HiInbox, HiOutlineAdjustments, HiUserCircle } from "react-icons/hi";
import "../styles/block.css"
import InfoCardList from './InfoCardList';
import Floor from './Floor';
function Block({b}) {
    return (
        <div class='Bl border-2 flex'>
            <div className="lef w-fit flex flex-col justify-center">
                <Card
                    className="ca max-w-sm rounded"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc="./building.jpg"
                >
                    {/* <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Noteworthy technology acquisitions 2021
                    </h5> */}
                    <div className="bp flex-1">
                        <div className='w-full'>
                            <span className="info inline-block w-1/2  text-blue-600">Washroom:</span>
                            <span className='info-2 w-1/2 text-center'>Western/Indian</span>
                        </div>
                        <div>
                            <span className="info inline-block w-1/2 text-blue-600">No of fans:</span>
                            <span className='info-2 w-1/2 text-center'>2</span>
                        </div>
                        <div>
                            <span className="info inline-block w-1/2 text-blue-600">No of lights:</span>
                            <span className='info-2 w-1/2 text-center'>2</span>
                        </div>
                        <div>
                            <span className="info inline-block w-1/2 text-blue-600">Other Facilities:</span>
                            <span className='info-2 w-1/2 text-center'>Yoga hall</span>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="r">
                <div>
                    <h1 className='text-2xl font-bold text-blue-900'>{b.blockName}</h1>
                    <InfoCardList bl={b}/>
                    {b.floors.map((i,ind)=>(
                        <Floor fl={i} blo={b}/>
                    ))}
                    {/* <Floor fl={bl.floors}/>
                    <Floor fl={bl.floors}/>
                    <Floor fl={bl.floors}/> */}
                    {/* <Floor no={1} rooms={10} vacant={4}/> */}
                </div>
            </div>

        </div>
    )
}

export default Block