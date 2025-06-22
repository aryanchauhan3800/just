import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVerticalIcon } from "lucide-react";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import { FaCrown, FaRegBell } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { GoUpload } from "react-icons/go";
import { IoIosCheckmarkCircleOutline, IoMdShare } from "react-icons/io";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { RiArrowGoBackLine } from "react-icons/ri";

type POContext = {
    status: boolean;
    isSent: boolean;
    isReminderSent: boolean;
    itemsReceived: boolean;
    isAccepted: boolean;
    purchaseOrderDone: boolean
};


const MoreOptionsDropdown = ({ context, onPurchaseReturnClick }: { context: POContext; onPurchaseReturnClick: () => void }) => {
    const getDropdownOptions = (ctx: POContext) => {
        const options = [];

        if (!ctx.isSent) {
            options.push({
                label: 'Mark as Sent',
                icon: <AiOutlineCheck />,
                onClick: () => console.log('Marked as sent'),
            });

            options.push({
                label: 'Edit Purchase Order',
                icon: <FiEdit />,
                onClick: () => console.log('Edit PO'),
            });

            options.push({ isSeparator: true });

            options.push({
                label: (
                    <span className='flex items-center gap-2 text-red-500'>
                        <AiOutlineDelete /> Delete Purchase Order
                    </span>
                ),
                onClick: () => { },
            });
        }

        if (ctx.isSent && !ctx.purchaseOrderDone) {
            options.push({
                label: (
                    <span className='flex items-center gap-2'>
                        <FaRegBell /> Set Reminder
                    </span>
                ),
                icon: <FaCrown className='text-yellow-500' />,
                isLabel: true,
            });

            options.push({
                label: 'Mark as Draft',
                icon: <RiArrowGoBackLine />,
                onClick: () => { },
            });

            options.push({
                label: (
                    <span className='flex items-center gap-2'>
                        <IoMdShare /> Share Purchase Order
                    </span>
                ),
                onClick: () => { },
            });

            options.push({ isSeparator: true });

            options.push({
                label: (
                    <span className='flex items-center gap-2 text-red-500'>
                        <AiOutlineDelete /> Delete Purchase Order
                    </span>
                ),
                onClick: () => { },
            });
        }

        if (ctx.purchaseOrderDone) {
            options.push({
                label: 'Mark as "Delivery Pending"',
                icon: <RiArrowGoBackLine />,
                onClick: () => { },
            });

            options.push({
                label: (
                    <span className='flex items-center gap-2'>
                        <IoMdShare /> Share Purchase Order
                    </span>
                ),
                onClick: () => { },
            });

            options.push({
                label: (
                    <span className='flex items-center gap-2 text-red-500'>
                        <MdOutlineStickyNote2 /> Debit Note/Purchase Return
                    </span>
                ),
                onClick: onPurchaseReturnClick,
            });
        }

        // if (ctx.isSent && ctx.acceptancePending && !ctx.itemsReceived) {
        //     options.push({
        //         label: 'Mark as "Items Received"',
        //         icon: <IoIosCheckmarkCircleOutline />,
        //         onClick: () => { },
        //     });

        //     options.push({
        //         label: 'Mark as "Acceptance Pending"',
        //         icon: <RiArrowGoBackLine />,
        //         onClick: () => { },
        //     });

        //     options.push({
        //         label: (
        //             <span className='flex items-center gap-2'>
        //                 <IoMdShare /> Share Purchase Order
        //             </span>
        //         ),
        //         onClick: () => { },
        //     });

        //     options.push({
        //         label: (
        //             <span className='flex items-center gap-2 text-red-500'>
        //                 <AiOutlineDelete /> Delete Purchase Order
        //             </span>
        //         ),
        //         onClick: () => { },
        //     });
        // }

        // if (ctx.isSent && ctx.acceptancePending && ctx.itemsReceived) {
        //     options.push({
        //         label: 'Mark as "Acceptance Pending"',
        //         icon: <RiArrowGoBackLine />,
        //         onClick: () => { },
        //     });

        //     options.push({
        //         label: (
        //             <span className='flex items-center gap-2'>
        //                 <IoMdShare /> Share Purchase Order
        //             </span>
        //         ),
        //         onClick: () => { },
        //     });

        //     options.push({
        //         label: (
        //             <span className='flex items-center gap-2 text-red-500'>
        //                 <AiOutlineDelete /> Delete Purchase Order
        //             </span>
        //         ),
        //         onClick: () => { },
        //     });
        // }

        // if (!ctx.deliveryPending) {
        //     options.push({
        //         label: 'Mark as "Delivery Pending"',
        //         icon: <RiArrowGoBackLine />,
        //         onClick: () => { },
        //     });
        // }

        // options.push({
        //     label: 'Mark as "Items Not Received"',
        //     icon: <RiArrowGoBackLine />,
        //     onClick: () => { },
        // });

        // options.push({
        //     label: 'Upload another Invoice',
        //     icon: <GoUpload />,
        //     onClick: () => { },
        // });

        // if (ctx.isSent && !ctx.isReminderSent) {
        //     options.push({
        //         label: (
        //             <span className='flex items-center gap-2'>
        //                 <FaRegBell /> Send Reminder of pending
        //             </span>
        //         ),
        //         icon: <FaCrown className='text-yellow-500' />,
        //         isLabel: true,
        //     });
        // }

        // options.push({
        //     label: (
        //         <span className='flex items-center gap-2 text-red-500'>
        //             <MdOutlineStickyNote2 /> Debit Note/Purchase Return
        //         </span>
        //     ),
        //     onClick: () => { },
        // });

        return options;
    };


    const options = getDropdownOptions(context);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVerticalIcon className='h-10 w-10 p-2 rounded-full bg-[#FFFFFF] border border-[#E8E8E8] hover:bg-gray-100' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {options.map((opt, idx) => {
                    if (opt.isSeparator) {
                        return <DropdownMenuSeparator key={idx} />;
                    }

                    if (opt.isLabel) {
                        return (
                            <DropdownMenuLabel key={idx} className='flex justify-between items-center gap-2'>
                                {opt.label}
                                {opt.icon}
                            </DropdownMenuLabel>
                        );
                    }

                    return (
                        <DropdownMenuItem key={idx} onClick={opt.onClick} className='flex items-center gap-2'>
                            {opt.icon}
                            {typeof opt.label === 'string' ? <span>{opt.label}</span> : opt.label}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MoreOptionsDropdown
