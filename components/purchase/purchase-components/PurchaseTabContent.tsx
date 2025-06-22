import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RiSendPlaneFill } from 'react-icons/ri'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { ChevronRight } from 'lucide-react'
import TrackItemsModal from './items-recieved/TrackItemsModal'

const PurchaseTabContent = ({ isSent, isAccepted, setIsAccepted }: { isSent: boolean; isAccepted: boolean; setIsAccepted: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [showTrackItems, setShowTrackItems] = useState(false);

    const handleItemsRecieved = () => {
        setShowTrackItems(true)
    }

    return (
        <>
            <div className='w-full h-[670px] px-6 py-4 flex flex-col justify-center items-center'>
                <div className='mb-2'>
                    <Image
                        src="/purchasebox.png"
                        alt="creditNote"
                        width={60}
                        height={60}
                    />
                </div>
                {
                    isSent ? (
                        <>
                            {
                                isAccepted ? (
                                    <div className='flex flex-col justify-center items-center space-y-2'>
                                        <p className='text-[#474747] text-base'>Items Recieved</p>
                                        <p className='text-[#6B6B6B] text-sm'>Record the items that you have received to create a Purchase Record</p>
                                        <Button
                                            variant='outline'
                                            className='text-[#474747] text-base'
                                            onClick={handleItemsRecieved}
                                        >
                                            Tracks Items Recieved<ChevronRight />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className='flex flex-col justify-center items-center space-y-2'>
                                        <p className='text-[#474747] text-base'>Make as Accepted</p>
                                        <p className='text-[#6B6B6B] text-sm'>Record the items that you have received to create a Purchase Record</p>
                                        <Button
                                            variant='outline'
                                            className='text-[#474747] text-base'
                                            onClick={() => setIsAccepted(true)}
                                        >
                                            <IoIosCheckmarkCircleOutline />Mark as Accepted
                                        </Button>
                                    </div>
                                )
                            }
                        </>
                    ) : (
                        <div className='flex flex-col justify-center items-center space-y-2'>
                            <p className='text-[#474747] text-base'>Share Purchase Order</p>
                            <p className='text-[#6B6B6B] text-sm'>Share the Purchase Order to record Purchase</p>
                            <Button
                                variant='outline'
                                className='text-[#474747] text-base'
                            >
                                Share Purchase Order<RiSendPlaneFill />
                            </Button>
                        </div >
                    )
                }
            </div >
            <TrackItemsModal open={showTrackItems} onOpenChange={setShowTrackItems} />
        </>
    )
}

export default PurchaseTabContent