import { create } from 'zustand'

type CreditNoteStore = {
    showRecordPayment: boolean
    setShowRecordPayment: (value: boolean) => void
}

type CreditTab = {
    showMenuForCredit: boolean
    setShowMenuForCredit: (value: boolean) => void
}

type InvoiceUploadDone = {
    isInvoiceUploaded: boolean
    setIsInvoiceUploaded: (value: boolean) => void
}

type ItemsAdded = {
    itemsAdded: boolean,
    setItemsAdded: (value: boolean) => void
}

type DebitUpload = {
    isDebitNoteUploaded: boolean
    setIsDebitNoteUploaded: (value: boolean) => void
}

export const useCreditNoteStore = create<CreditNoteStore>((set) => ({
    showRecordPayment: false,
    setShowRecordPayment: (value) => set({ showRecordPayment: value }),
}))

export const useCreditTabOpen = create<CreditTab>((set) => ({
    showMenuForCredit: false,
    setShowMenuForCredit: (value) => set({ showMenuForCredit: value })
}))

export const useInvoiceUploadDone = create<InvoiceUploadDone>((set) => ({
    isInvoiceUploaded: false,
    setIsInvoiceUploaded: (value) => set({ isInvoiceUploaded: value })
}))

export const useAddedToInventory = create<ItemsAdded>((set) => ({
    itemsAdded: false,
    setItemsAdded: (value) => set({ itemsAdded: value })
}))

export const useDebitNoteUploaded = create<DebitUpload>((set) => ({
    isDebitNoteUploaded: false,
    setIsDebitNoteUploaded: (value) => set({ isDebitNoteUploaded: value })
}))