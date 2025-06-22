import Image from 'next/image'

const TemplatePreview = () => {
    return (
        <div className="w-full h-full flex items-center justify-center border rounded-lg bg-gray-50 p-4">
            <Image
                src="/sample-invoice-preview.png" // Replace with actual image in /public
                alt="Mock Invoice Preview"
                width={500}
                height={700}
                className="rounded shadow"
            />
        </div>
    )
}

export default TemplatePreview