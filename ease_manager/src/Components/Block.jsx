import React from 'react'
import { Card,ListGroup} from 'flowbite-react'
import { HiCloudDownload, HiInbox, HiOutlineAdjustments, HiUserCircle } from "react-icons/hi";
import "../styles/block.css"
import InfoCardList from './InfoCardList';
import Floor from './Floor';
function Block() {
    return (
        <div class='Bl border-2 flex'>
            <div className="lef h-full">
                <Card
                    className="ca max-w-sm rounded"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc="./building.jpg"
                >
                    {/* <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Noteworthy technology acquisitions 2021
                    </h5> */}
                    <div className="bp">
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
            <div className="ri">
                <div>
                    <h1 className='text-2xl font-bold text-blue-900'>Block Q</h1>
                    <InfoCardList/>
                    <Floor no={1} rooms={10} vacant={4}/>
                    <Floor no={2} rooms={10} vacant={5}/>
                    <Floor no={3} rooms={10} vacant={6}/>
                    {/* <Floor no={1} rooms={10} vacant={4}/> */}
                </div>
            </div>

        </div>
    )
}

export default Block