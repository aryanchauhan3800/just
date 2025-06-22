import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useBankMethod } from '@/context/BankMethodContext'
import { useCreateBank } from '@/hooks/useInvoice'
import { ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

const BankForm = () => {
    const { setStep, selectedBank, setDialogOpen } = useBankMethod()
    const [accountType, setAccountType] = useState("SAVINGS")
    const [name, setName] = useState(selectedBank || "")
    const [accountHolderName, setAccountHolderName] = useState("")
    const [accountNumber, setAccountNumber] = useState("")
    const [ifscCode, setIfscCode] = useState("")
    const [branch, setBranch] = useState("")
    const [location, setLocation] = useState("")
    const [upiId, setUpiId] = useState("")
    const [openingBalance, setOpeningBalance] = useState("")
    const [paymentMode, setPaymentMode] = useState("")

    const createBank = useCreateBank()

    const handleBack = () => {
        setStep("select-bank")
    }

    const handleSave = () => {
        const balance = Number(openingBalance) || 0

        const data = {
            name,
            accountType: accountType as 'SAVINGS' | 'CURRENT',
            accountHolderName,
            accountNumber,
            ifscCode,
            branch,
            location,
            upiId,
            openingBalance: balance,
            balance: balance,
        }

        createBank.mutate(data, {
            onSuccess: () => {
                toast.success('Bank added successfully')
                setDialogOpen(false)
            },
            onError: () => {
                toast.error('Failed to add bank')
            }
        })
    }

    return (
        <div>
            <h1 className='px-4 pb-6'>Bank Details</h1>
            <div className='mb-4'>
                <div className='px-6 space-y-4'>
                    <div className="grid grid-cols-[0.9fr_2fr] text-sm">
                        <Label><span className="text-red-500 ml-1">*</span>Account Type:</Label>
                        <RadioGroup
                            value={accountType}
                            onValueChange={setAccountType}
                            className="flex flex-row items-center space-x-4 ml-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="CURRENT" id="current" />
                                <Label htmlFor="current">Current Account</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="SAVINGS" id="savings" />
                                <Label htmlFor="savings">Savings Account</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="grid grid-cols-[1fr_2fr] text-sm">
                        <Label>Bank Name:</Label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="HDFC Bank"
                            className="w-2/3"
                        />
                    </div>
                    <div className="grid grid-cols-[1fr_2fr] text-sm">
                        <Label><span className="text-red-500 ml-1">*</span>Account Holder Name:</Label>
                        <Input
                            type="text"
                            value={accountHolderName}
                            onChange={(e) => setAccountHolderName(e.target.value)}
                            placeholder="Enter Account Holder Name"
                            className="w-2/3"
                        />
                    </div>
                    <div className="grid grid-cols-[1fr_2fr] text-sm">
                        <Label><span className="text-red-500 ml-1">*</span>Account Number:</Label>
                        <Input
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            placeholder="Enter Account Number"
                            className="w-2/3"
                        />
                    </div>
                    <div className="grid grid-cols-[1fr_2fr] text-sm">
                        <Label><span className="text-red-500 ml-1">*</span>IFSC code:</Label>
                        <Input
                            type="text"
                            value={ifscCode}
                            onChange={(e) => setIfscCode(e.target.value)}
                            placeholder="Enter IFSC code"
                            className="w-2/3"
                        />
                    </div>
                    <div className="grid grid-cols-[1fr_2fr] text-sm">
                        <Label><span className="text-red-500 ml-1">*</span>Branch Name:</Label>
                        <Input
                            type="text"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            placeholder="Enter Branch Name"
                            className="w-2/3"
                        />
                    </div>
                    <div className="grid grid-cols-[1fr_2fr] text-sm">
                        <Label><span className="text-red-500 ml-1">*</span>Location:</Label>
                        <Input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter Location"
                            className="w-2/3"
                        />
                    </div>
                    <div className="grid grid-cols-[1fr_2fr] text-sm">
                        <Label><span className="text-red-500 ml-1">*</span>UPI ID:</Label>
                        <Input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="Enter UPI ID"
                            className="w-2/3"
                        />
                    </div>
                </div>
                <hr className='my-4' />
                <div className="grid grid-cols-[1fr_2fr] text-sm px-6">
                    <Label><span className="text-red-500 ml-1">*</span>Opening Balance:</Label>
                    <Input
                        type="text"
                        value={openingBalance}
                        onChange={(e) => setOpeningBalance(e.target.value)}
                        placeholder="Enter Opening Balance"
                        className="w-2/3"
                    />
                </div>
                <div className="grid grid-cols-[1fr_2fr] text-sm px-6 mt-2">
                    <Label><span className="text-red-500 ml-1">*</span>Mode:</Label>
                    <Select
                        value={paymentMode}
                        onValueChange={setPaymentMode}
                    >
                        <SelectTrigger className="w-2/3 mt-1">
                            <SelectValue placeholder="Select payment mode" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="CASH">Cash</SelectItem>
                            <SelectItem value="CHEQUE">Cheque</SelectItem>
                            <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                            <SelectItem value="UPI">Upi</SelectItem>
                            <SelectItem value="CARD">Card</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="border-t pt-4 pb-2 flex justify-between px-6">
                <Button variant="ghost" onClick={handleBack}>
                    <ChevronLeft />Back
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div>
    )
}

export default BankForm