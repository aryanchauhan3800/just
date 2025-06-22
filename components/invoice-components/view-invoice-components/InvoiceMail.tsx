import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import TextEditor from '../../TextEditor'

const InvoiceMail = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    const invoiceHTML = `
  <style>
        .invoice - header {
            padding: 0.5rem 0;
    border - top: 1px solid #025AE0;
    border - bottom: 1px solid #025AE0;
    text - align: center;
}
    .invoice - header h2 {
    font - size: 1.125rem;
    color: #025AE0;
}
    .payment - options ul {
    list - style: none;
    padding - left: 0;
}
    .payment - options li {
    margin - bottom: 0.5rem;
}
    .highlight - box {
    margin - top: 2rem;
    border: 2px dashed #f59e0b;
    padding: 1rem;
    text - align: center;
}
    .highlight - box span {
    color: red;
    font - size: 1.25rem;
}
    .invoice - content p {
    margin: 0.5rem 0;
}
  </style >

    <div class="invoice-content">
        <div class="invoice-header">
            <h2>Invoice #INV - 000100</h2>
        </div>

        <p>Dear <strong>Customer Name</strong>,</p>

        <p>Thank you for your business. This mail is to provide you the Invoice. You can download it from the attachment. You can choose to pay via the following methods.</p>

        <p><strong>Amount Due</strong>: ₹ 40,00,000.00</p>
        <p><strong>Due Date</strong>: <span style="color: #333;">14 April, 2025</span></p>
        <p><strong>Payment Modes</strong>: Cash, Bank Transfer, UPI</p>

        <p><strong>Payment Options</strong></p>
        <ul class="payment-options">
            <li>
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Paytm_logo.png" alt="Paytm" width="80" />
                <a href="https://paytm.com" target="_blank">click here to pay</a>
            </li>
            <li>
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" width="80" />
                <a href="https://stripe.com" target="_blank" style="margin-left: 8px;">click here to pay</a>
            </li>
            <li>
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Razorpay_logo.svg" alt="Razorpay" width="80" />
                <a href="https://razorpay.com" target="_blank" style="margin-left: 8px;">click here to pay</a>
            </li>
        </ul>

        <div class="highlight-box">
            <strong>Amount Due</strong><br />
            <span>₹ 40,00,000.00</span>
        </div>
    </div>
`;


    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="min-w-2xl flex flex-col h-full">
                <DrawerHeader className="flex flex-row justify-between items-center border-b px-4 flex-shrink-0">
                    <DrawerTitle className="text-lg font-semibold">Mail Invoice</DrawerTitle>
                    <DrawerClose asChild>
                        <Button variant="ghost" size="icon" className="border rounded-full">
                            <X className="h-5 w-5" />
                        </Button>
                    </DrawerClose>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto">
                    <div className="border m-4">
                        <div className="grid grid-cols-12 items-center gap-2 border-y px-4 text-sm">
                            <Label htmlFor="from" className="col-span-3 text-[#9D9D9D]">From</Label>
                            <Input
                                id="from"
                                defaultValue="abhishek1194@platina.in"
                                className="col-span-9 border-none shadow-none w-full text-[#444444]"
                            />
                        </div>
                        <div className="grid grid-cols-12 items-center gap-2 border-y px-4 text-sm">
                            <Label htmlFor="to" className="col-span-3 text-[#9D9D9D]">Send To</Label>
                            <Input
                                id="to"
                                defaultValue="abhishek1194@platina.in"
                                className="col-span-9 border-none shadow-none w-full text-[#444444]"
                            />
                        </div>
                        <div className="grid grid-cols-12 items-center gap-2 border-y px-4 text-sm">
                            <Label htmlFor="cc" className="col-span-3 text-[#9D9D9D]">Cc</Label>
                            <Input
                                id="cc"
                                className="col-span-9 border-none shadow-none w-full text-[#444444]"
                            />
                        </div>
                        <div className="grid grid-cols-12 items-center gap-2 border-y px-4 text-sm">
                            <Label htmlFor="bcc" className="col-span-3 text-[#9D9D9D]">BCc</Label>
                            <Input
                                id="bcc"
                                className="col-span-9 border-none shadow-none w-full text-[#444444]"
                            />
                        </div>
                        <div className="grid grid-cols-12 items-center gap-2 border-y px-4 text-sm">
                            <Label htmlFor="subject" className="col-span-3 text-[#9D9D9D]">Subject</Label>
                            <Input
                                id="subject"
                                defaultValue="Invoice - INV000100"
                                className="col-span-9 border-none shadow-none w-full text-[#444444]"
                            />
                        </div>
                        <TextEditor
                            initialContent={invoiceHTML}
                            onContentChange={(html) => console.log(html)}
                        />
                    </div>
                </div>


                {/* <div className='py-2 border-y border-[#025AE0] text-center'>
                    <h2 className='text-lg text-[#025AE0]'>Invoice #INV - 000100</h2>
                </div>

                <p>Dear <strong>Customer Name</strong>,</p>

                <p>Thank you for your business. This mail is to provide you the Invoice. You can download it from the attachment. You can choose to pay via the following methods.</p>

                <p><strong>Amount Due</strong>: ₹ 40,00,000.00</p>
                <p><strong>Due Date</strong>: <span>14 April, 2025</span></p>
                <p><strong>Payment Modes</strong>: Cash, Bank Transfer, UPI</p>

                <p><strong>Payment Options</strong></p>
                <ul style={{}}>
                    <li>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Paytm_logo.png" alt="Paytm" width="80" />
                        <a href="https://paytm.com" target="_blank">click here to pay</a>
                    </li>
                    <li>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" width="80" />
                        <a href="https://stripe.com" target="_blank">click here to pay</a>
                    </li>
                    <li>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Razorpay_logo.svg" alt="Razorpay" width="80" />
                        <a href="https://razorpay.com" target="_blank">click here to pay</a>
                    </li>
                </ul>

                <div style={{}}>
                    <strong>Amount Due</strong><br />
                    <span style={{}}>₹ 40,00,000.00</span>
                </div> */}

                <DrawerFooter className="border-t p-4 flex-row justify-between space-x-2 flex-shrink-0">
                    <Button>Save</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default InvoiceMail