import React from 'react'
import { Button } from '../ui/button'
import { MoreVerticalIcon } from 'lucide-react'

const DraftInvoice = () => {
    return (
        <div>
            <h1>View Invoice</h1>
            <div>
                <span>Edit Invoice</span>
                <span>Customize Template</span>
                <span>Share</span>
                <span>PDF</span>
            </div>
            <Button>Mark as Sent</Button>
            <MoreVerticalIcon fontSize="small" />
        </div>
    )
}

export default DraftInvoice